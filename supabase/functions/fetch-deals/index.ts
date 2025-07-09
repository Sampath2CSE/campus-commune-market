import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface Deal {
  title: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  image_url?: string;
  store_name: string;
  category: string;
  affiliate_url: string;
  external_id: string;
  rating?: number;
  reviews_count?: number;
  is_featured?: boolean;
  expires_at?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get existing deals count
    const { count } = await supabaseClient
      .from('deals')
      .select('*', { count: 'exact', head: true })

    // If we have recent deals, return them
    if (count && count > 0) {
      const { data: existingDeals } = await supabaseClient
        .from('deals')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })

      if (existingDeals && existingDeals.length > 0) {
        return new Response(
          JSON.stringify({ deals: existingDeals, cached: true }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }
    }

    // Fetch fresh deals from multiple sources
    const allDeals: Deal[] = []

    // Fetch from Walmart
    try {
      const walmartResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/walmart-api`, {
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        },
      })
      
      if (walmartResponse.ok) {
        const walmartData = await walmartResponse.json()
        allDeals.push(...walmartData.deals)
      }
    } catch (error) {
      console.error('Error fetching Walmart deals:', error)
    }

    // Add sample deals if no real data available
    if (allDeals.length === 0) {
      allDeals.push(
        {
          title: "Student Laptop - HP Pavilion 15",
          price: 549.99,
          original_price: 699.99,
          discount_percentage: 21,
          image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
          store_name: "Best Buy",
          category: "Tech",
          affiliate_url: "https://bestbuy.com/student-laptop",
          external_id: "bb_laptop_001",
          rating: 4.3,
          reviews_count: 1250,
          is_featured: true,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          title: "Wireless Earbuds - Sony WF-1000XM4",
          price: 199.99,
          original_price: 279.99,
          discount_percentage: 29,
          image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
          store_name: "Amazon",
          category: "Tech",
          affiliate_url: "https://amazon.com/sony-earbuds",
          external_id: "amz_earbuds_001",
          rating: 4.5,
          reviews_count: 890,
          is_featured: true
        }
      )
    }

    // Clear old deals (older than 7 days)
    await supabaseClient
      .from('deals')
      .delete()
      .lt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    // Insert new deals
    const { data: insertedDeals, error } = await supabaseClient
      .from('deals')
      .insert(allDeals)
      .select()

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ deals: insertedDeals, cached: false }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in fetch-deals function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})