import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface WalmartProduct {
  name: string;
  salePrice: number;
  msrp?: number;
  thumbnailImage?: string;
  productUrl: string;
  itemId: string;
  categoryPath: string;
  customerRating?: string;
  numReviews?: number;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Student-relevant search terms
const STUDENT_SEARCHES = [
  'laptop students',
  'textbooks',
  'backpack',
  'desk organizer',
  'wireless earbuds',
  'tablet',
  'calculator',
  'desk lamp'
]

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Note: Walmart's Open API requires API key but has student-friendly endpoints
    // For production, you'd need to register at https://developer.walmart.com/
    const WALMART_API_KEY = Deno.env.get('WALMART_API_KEY')
    
    if (!WALMART_API_KEY) {
      // Return mock data for demo purposes
      const mockDeals = [
        {
          title: "5-Subject Notebook Pack",
          price: 12.99,
          original_price: 19.99,
          discount_percentage: 35,
          image_url: "https://images.unsplash.com/photo-1531347520862-2c75e2f10af4",
          store_name: "Walmart",
          category: "Stationery",
          affiliate_url: "https://walmart.com/notebooks",
          external_id: "wm_notebook_001",
          rating: 4.2,
          reviews_count: 445
        },
        {
          title: "Student Desk Organizer Set",
          price: 24.99,
          original_price: 34.99,
          discount_percentage: 29,
          image_url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
          store_name: "Walmart",
          category: "Dorm",
          affiliate_url: "https://walmart.com/organizer",
          external_id: "wm_organizer_001",
          rating: 4.4,
          reviews_count: 234
        }
      ]

      return new Response(
        JSON.stringify({ deals: mockDeals, source: 'mock' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    const deals = []
    
    // Search for student deals across different categories
    for (const searchTerm of STUDENT_SEARCHES.slice(0, 3)) { // Limit to avoid rate limits
      try {
        const response = await fetch(
          `https://api.walmart.com/v1/search?query=${encodeURIComponent(searchTerm)}&format=json&apiKey=${WALMART_API_KEY}&numItems=5`,
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          
          if (data.items) {
            for (const item of data.items) {
              const discountPercentage = item.msrp && item.salePrice < item.msrp 
                ? Math.round(((item.msrp - item.salePrice) / item.msrp) * 100)
                : 0

              // Only include items with discounts for student deals
              if (discountPercentage >= 10) {
                deals.push({
                  title: item.name,
                  price: item.salePrice,
                  original_price: item.msrp,
                  discount_percentage: discountPercentage,
                  image_url: item.thumbnailImage,
                  store_name: "Walmart",
                  category: determineCategory(item.categoryPath),
                  affiliate_url: item.productUrl,
                  external_id: `wm_${item.itemId}`,
                  rating: item.customerRating ? parseFloat(item.customerRating) : undefined,
                  reviews_count: item.numReviews || 0
                })
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error searching for ${searchTerm}:`, error)
        continue
      }
    }

    return new Response(
      JSON.stringify({ deals, source: 'walmart_api' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in walmart-api function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

function determineCategory(categoryPath: string): string {
  if (!categoryPath) return 'Other'
  
  const path = categoryPath.toLowerCase()
  
  if (path.includes('electronics') || path.includes('computer') || path.includes('laptop')) {
    return 'Tech'
  }
  if (path.includes('book') || path.includes('education')) {
    return 'Books'
  }
  if (path.includes('home') || path.includes('dorm') || path.includes('furniture')) {
    return 'Dorm'
  }
  if (path.includes('office') || path.includes('school') || path.includes('supplies')) {
    return 'Stationery'
  }
  
  return 'Other'
}