import type { FeaturedDrill } from '../components';
import type { Drill } from '../../../types';
import { mockDrills } from '../../drills/data/mockDrills';

// Sample high-quality images for featured drills
const featuredImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
];

// Featured drill images
const drillSpecificImages: Record<string, any> = {
  'drill-1': require('../images/Badminton_Footwork.png'),
  'drill-3': require('../images/net.png'),
  'drill-2': require('../images/practice.png'),
  'drill-4': require('../images/net_kill.jpg'),
  'drill-41': require('../images/smashphoto.png'),
};

/**
 * Transforms a Drill into a FeaturedDrill format
 */
function transformToFeaturedDrill(drill: Drill, imageIndex: number): FeaturedDrill {
  // Get court position from tags
  const courtPositionTag = drill.tags.find(
    (tag) => tag.category === 'court_position'
  );
  const courtPosition = courtPositionTag?.name || 'Full Court';

  // Capitalize difficulty
  const difficulty =
    drill.difficulty.charAt(0).toUpperCase() + drill.difficulty.slice(1);

  // Generate realistic rating and reviews
  const rating = 4.5 + Math.random() * 0.5; // 4.5-5.0
  const reviews = Math.floor(50 + Math.random() * 200); // 50-250

  return {
    id: drill.id,
    title: drill.title,
    subtitle: `${difficulty} · ${courtPosition}`,
    rating: Math.round(rating * 10) / 10,
    reviews,
    image: drillSpecificImages[drill.id] || drill.imageUrl || featuredImages[imageIndex % featuredImages.length],
    isFavorite: false,
  };
}

const selectedDrillIds = [
  'drill-1',  // Basic Shadow Footwork (Beginner)
  'drill-41', // Drive Pressure Rally (Intermediate) - if exists
  'drill-4',  // Net Kill Basics (Beginner)
  'drill-3',  // Serve Accuracy Training (Beginner)
  'drill-2',  // Wall Rally Practice (Beginner)
];

export const featuredDrills: FeaturedDrill[] = mockDrills
  .filter((drill) => selectedDrillIds.includes(drill.id))
  .map((drill, index) => transformToFeaturedDrill(drill, index))
  .slice(0, 5); // Limit to 5 featured drills
