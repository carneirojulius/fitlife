import { type BlogPost, type InsertBlogPost, type Exercise, type InsertExercise, type Equipment, type InsertEquipment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Exercises
  getAllExercises(): Promise<Exercise[]>;
  getExercisesByCategory(category: string): Promise<Exercise[]>;
  getExerciseBySlug(slug: string): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  
  // Equipment
  getAllEquipment(): Promise<Equipment[]>;
  createEquipment(equipment: InsertEquipment): Promise<Equipment>;
}

export class MemStorage implements IStorage {
  private blogPosts: Map<string, BlogPost>;
  private exercises: Map<string, Exercise>;
  private equipment: Map<string, Equipment>;

  constructor() {
    this.blogPosts = new Map();
    this.exercises = new Map();
    this.equipment = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Featured blog posts
    const samplePosts: InsertBlogPost[] = [
      {
        title: "Mastering the Deadlift: Complete Form Guide",
        excerpt: "Learn proper deadlift technique to build total-body strength safely and effectively. Includes common mistakes to avoid and progression tips.",
        content: "The deadlift is often called the king of all exercises, and for good reason. This compound movement engages more muscles than any other single exercise, making it incredibly efficient for building strength and muscle mass. In this comprehensive guide, we'll cover everything you need to know about mastering the deadlift.\n\n## Why Deadlifts Matter\n\nDeadlifts work your entire posterior chain - your hamstrings, glutes, erector spinae, lats, traps, and rhomboids. They also engage your core muscles and forearms, making it a true full-body exercise. Regular deadlifting can improve your posture, strengthen your back, and increase your overall functional strength.\n\n## Proper Form\n\n1. **Setup**: Stand with feet hip-width apart, toes pointing slightly outward. The barbell should be over the middle of your feet.\n2. **Grip**: Reach down and grip the bar with hands just outside your legs. Use either a double overhand grip or mixed grip.\n3. **Position**: Keep your chest up, shoulders back, and core engaged. Your shins should be close to the bar.\n4. **The Lift**: Drive through your heels, keeping the bar close to your body. Extend your hips and knees simultaneously.\n5. **Lockout**: Stand tall with shoulders back and hips fully extended.\n6. **Descent**: Lower the bar by pushing your hips back first, then bending your knees.\n\n## Common Mistakes to Avoid\n\n- Rounding your back\n- Looking up during the lift\n- Allowing the bar to drift away from your body\n- Not fully extending your hips at the top\n- Dropping the weight instead of controlling the descent\n\n## Progression Tips\n\nStart with lighter weights and focus on perfect form. Gradually increase the weight as you become more comfortable with the movement. Consider variations like sumo deadlifts or Romanian deadlifts to target different muscle groups and keep your training interesting.",
        category: "Strength",
        publishDate: "Mar 15, 2024",
        imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        slug: "mastering-deadlift-form-guide"
      },
      {
        title: "Perfect Your Squat: Depth, Form, and Variations",
        excerpt: "Discover the secrets to a perfect squat, from achieving proper depth to exploring different variations that target specific muscle groups.",
        content: "The squat is a fundamental movement pattern that translates to many daily activities. Whether you're sitting down, standing up, or picking something up from the ground, you're essentially performing a squat. Mastering this exercise is crucial for building lower body strength and improving functional movement.\n\n## The Benefits of Squatting\n\nSquats primarily target your quadriceps, glutes, and hamstrings, but they also engage your core muscles for stability. Regular squatting can improve your hip and ankle mobility, strengthen your knees, and enhance your athletic performance.\n\n## Proper Squat Form\n\n1. **Stance**: Stand with feet slightly wider than hip-width, toes pointing slightly outward.\n2. **Descent**: Initiate the movement by pushing your hips back, then bending your knees.\n3. **Depth**: Descend until your hip crease is below your knee cap.\n4. **Knees**: Keep your knees in line with your toes throughout the movement.\n5. **Ascent**: Drive through your heels and push the floor away to return to standing.\n\n## Squat Variations\n\n### Goblet Squats\nPerfect for beginners, holding a dumbbell or kettlebell at chest level helps maintain proper posture.\n\n### Back Squats\nThe classic barbell squat with the weight positioned on your upper back.\n\n### Front Squats\nMore quad-dominant variation with the weight held in front of your body.\n\n### Bulgarian Split Squats\nSingle-leg variation that challenges stability and addresses imbalances.\n\n## Common Issues and Solutions\n\n**Knee Cave**: If your knees collapse inward, focus on pushing them out and strengthening your glutes.\n**Forward Lean**: This often indicates tight hip flexors or weak core muscles.\n**Heel Rise**: If your heels come up, work on ankle mobility or use heel-elevated squats.\n\n## Programming Your Squats\n\nStart with bodyweight squats and master the movement pattern before adding weight. Aim for 2-3 sets of 8-12 repetitions, focusing on quality over quantity.",
        category: "Technique",
        publishDate: "Mar 12, 2024",
        imageUrl: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        slug: "perfect-squat-depth-form-variations"
      },
      {
        title: "Bench Press Mastery: Build Chest Power Safely",
        excerpt: "Everything you need to know about bench pressing: proper setup, breathing techniques, and progressive overload strategies.",
        content: "The bench press is one of the most popular exercises in the gym, and it's a fantastic way to build upper body strength and muscle mass. However, it's also one of the most technical lifts, requiring proper setup and execution to be both safe and effective.\n\n## Setting Up for Success\n\n### Bench Position\nLie on the bench with your eyes directly under the barbell. Your head, upper back, and glutes should maintain contact with the bench throughout the movement.\n\n### Foot Position\nPlant your feet firmly on the ground. Some lifters prefer to tuck their feet under the bench for better leg drive.\n\n### Grip and Hand Position\nGrip the bar with hands slightly wider than shoulder-width. Your forearms should be vertical at the bottom of the movement.\n\n## The Bench Press Movement\n\n1. **Unrack**: Lift the bar off the hooks with straight arms and position it over your chest.\n2. **Descent**: Lower the bar to your chest in a controlled manner, taking 2-3 seconds.\n3. **Touch Point**: The bar should touch your chest around nipple level.\n4. **Press**: Drive the bar up powerfully, focusing on pushing yourself away from the bar.\n5. **Lockout**: Extend your arms fully without letting your shoulders roll forward.\n\n## Breathing Technique\n\nTake a deep breath at the top and hold it during the descent and press. This creates intra-abdominal pressure and provides core stability. Exhale after completing the rep.\n\n## Common Mistakes\n\n- Bouncing the bar off the chest\n- Flaring the elbows too wide\n- Lifting the head off the bench\n- Pressing the bar forward instead of straight up\n- Not maintaining proper shoulder blade retraction\n\n## Bench Press Variations\n\n### Incline Bench Press\nTargets the upper chest and front deltoids more than the flat bench.\n\n### Decline Bench Press\nEmphasizes the lower chest muscles.\n\n### Dumbbell Bench Press\nAllows for a greater range of motion and helps address strength imbalances.\n\n### Close-Grip Bench Press\nShifts focus to the triceps while still working the chest.\n\n## Safety Considerations\n\nAlways use a spotter when lifting heavy weights, especially when training to failure. If you don't have a spotter, use safety bars or pins set at an appropriate height. Start with lighter weights and gradually progress as your strength and technique improve.",
        category: "Upper Body",
        publishDate: "Mar 10, 2024",
        imageUrl: "https://pixabay.com/get/g56968c5a3b0a51a10d4b00a72e664df47510059478d2dcb1495651fa6ef4915a84254e9d7510dde39a6a92e113177febbd61d4fca8ccdb1daf900595eaaafe92_1280.jpg",
        slug: "bench-press-mastery-build-chest-power"
      }
    ];

    // Sample exercises
    const sampleExercises: InsertExercise[] = [
      {
        name: "Pull-ups",
        targetMuscles: "Lats, Biceps, Upper Back",
        difficulty: "Intermediate",
        category: "upper",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        instructions: "Hang from a pull-up bar with hands slightly wider than shoulder-width apart. Pull your body up until your chin clears the bar, then lower with control.",
        tips: ["Keep your core engaged", "Don't swing or kip", "Focus on pulling with your back muscles", "Control the descent"],
        slug: "pull-ups"
      },
      {
        name: "Overhead Press",
        targetMuscles: "Shoulders, Triceps, Core",
        difficulty: "Beginner",
        category: "upper",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        instructions: "Stand with feet hip-width apart, press the weight from shoulder level straight overhead until arms are fully extended.",
        tips: ["Keep your core tight", "Don't arch your back excessively", "Press in a straight line", "Control the descent"],
        slug: "overhead-press"
      },
      {
        name: "Dumbbell Lunges",
        targetMuscles: "Quads, Glutes, Core",
        difficulty: "Beginner",
        category: "lower",
        imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        instructions: "Step forward into a lunge position, lowering your back knee toward the ground. Push through your front heel to return to starting position.",
        tips: ["Keep your front knee over your ankle", "Don't let your knee collapse inward", "Step far enough forward", "Keep your torso upright"],
        slug: "dumbbell-lunges"
      },
      {
        name: "Plank Hold",
        targetMuscles: "Core, Shoulders, Glutes",
        difficulty: "Beginner",
        category: "core",
        imageUrl: "https://pixabay.com/get/g836d15c4feeec2ef0131030de93cf054d86a008c006dde8c55156ff35db6abe6fd61f9c3515352e96edcce213861f81f19af0e92eddff93e0b9b9e759ce78868_1280.jpg",
        instructions: "Hold a push-up position with your body in a straight line from head to heels. Keep your core engaged and breathe normally.",
        tips: ["Don't let your hips sag", "Keep your head neutral", "Breathe steadily", "Start with shorter holds"],
        slug: "plank-hold"
      },
      {
        name: "Barbell Rows",
        targetMuscles: "Lats, Rhomboids, Biceps",
        difficulty: "Intermediate",
        category: "upper",
        imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        instructions: "Hinge at the hips and lean forward, pull the barbell to your lower chest/upper abdomen, then lower with control.",
        tips: ["Keep your back straight", "Pull with your elbows", "Squeeze your shoulder blades", "Don't use momentum"],
        slug: "barbell-rows"
      },
      {
        name: "Lateral Raises",
        targetMuscles: "Shoulders, Upper Traps",
        difficulty: "Beginner",
        category: "upper",
        imageUrl: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        instructions: "Raise dumbbells out to your sides until they reach shoulder height, then lower with control.",
        tips: ["Keep a slight bend in your elbows", "Don't swing the weights", "Control the movement", "Focus on your side delts"],
        slug: "lateral-raises"
      },
      {
        name: "Hip Thrusts",
        targetMuscles: "Glutes, Hamstrings",
        difficulty: "Intermediate",
        category: "lower",
        imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        instructions: "With your upper back against a bench, drive through your heels to lift your hips up, creating a straight line from knees to shoulders.",
        tips: ["Squeeze your glutes at the top", "Keep your core engaged", "Don't overextend your back", "Drive through your heels"],
        slug: "hip-thrusts"
      },
      {
        name: "Push-ups",
        targetMuscles: "Chest, Triceps, Core",
        difficulty: "Beginner",
        category: "upper",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        instructions: "Lower your body until your chest nearly touches the ground, then push back up to the starting position.",
        tips: ["Keep your body in a straight line", "Don't let your hips sag", "Control the descent", "Full range of motion"],
        slug: "push-ups"
      }
    ];

    // Sample equipment
    const sampleEquipment: InsertEquipment[] = [
      {
        name: "Adjustable Dumbbells",
        description: "Space-saving solution for home workouts",
        priceRange: "$299-599",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Power Rack System",
        description: "Complete safety for heavy lifts",
        priceRange: "$800-1500",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Olympic Barbell Set",
        description: "Professional-grade barbell and plates",
        priceRange: "$400-800",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Adjustable Bench",
        description: "Versatile for various exercises",
        priceRange: "$200-400",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    // Add sample data
    for (const post of samplePosts) {
      await this.createBlogPost(post);
    }

    for (const exercise of sampleExercises) {
      await this.createExercise(exercise);
    }

    for (const equip of sampleEquipment) {
      await this.createEquipment(equip);
    }
  }

  // Blog Posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { ...insertPost, id };
    this.blogPosts.set(id, post);
    return post;
  }

  // Exercises
  async getAllExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercisesByCategory(category: string): Promise<Exercise[]> {
    if (category === "all") {
      return this.getAllExercises();
    }
    return Array.from(this.exercises.values()).filter(exercise => exercise.category === category);
  }

  async getExerciseBySlug(slug: string): Promise<Exercise | undefined> {
    return Array.from(this.exercises.values()).find(exercise => exercise.slug === slug);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = randomUUID();
    const exercise: Exercise = { ...insertExercise, id };
    this.exercises.set(id, exercise);
    return exercise;
  }

  // Equipment
  async getAllEquipment(): Promise<Equipment[]> {
    return Array.from(this.equipment.values());
  }

  async createEquipment(insertEquipment: InsertEquipment): Promise<Equipment> {
    const id = randomUUID();
    const equipment: Equipment = { ...insertEquipment, id };
    this.equipment.set(id, equipment);
    return equipment;
  }
}

export const storage = new MemStorage();
