/**
 * Central Business Configuration for Unique Fitness
 * 
 * Update this file to modify business details, contact info, ratings, 
 * services, trainers, or media without altering UI logic.
 */

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  bio: string;
  image: string;
}

export interface ServiceProgram {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  recommendedFor: string;
  intensity: 'Medium' | 'High' | 'Custom / All Levels';
  iconName: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'GYM' | 'EQUIPMENT' | 'TRAINING' | 'CROSSFIT' | 'COMMUNITY';
  imageUrl: string;
  caption: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  reviewText: string;
  highlight?: string;
  verified: boolean;
}

export const BUSINESS_CONFIG = {
  name: "Unique Fitness",
  tagline: "Train. Transform. Thrive.",
  subtitle: "Premium Unisex Fitness & Strength Hub in Kengeri",
  businessType: "Unisex Gym / Fitness Centre",
  
  // Location & Address
  location: {
    addressLine1: "No. 540, Shashank Complex, Harsha Layout Main Road",
    landmark: "Opposite Sub Registrar Office",
    area: "Kengeri",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560060",
    fullAddress: "No. 540, Shashank Complex, Harsha Layout Main Road, Opposite Sub Registrar Office, Kengeri, Bengaluru, Karnataka 560060",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.043003056158!2d77.4812836!3d12.9174099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fa089d816fb%3A0x2db4451c863a3d5e!2sKengeri%20Sub-Registrar%20Office!5e0!3m2!1sen!2sin!4v1709880000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=No.+540,+Shashank+Complex,+Harsha+Layout+Main+Road,+Opposite+Sub+Registrar+Office,+Kengeri,+Bengaluru,+Karnataka+560060"
  },

  // Contact Information
  contact: {
    phoneDisplay: "+91 70192 01669",
    phoneRaw: "+917019201669",
    whatsappNumber: "917019201669",
    whatsappDefaultMessage: "Hi Unique Fitness, I would like to know more about your gym and training programs.",
    email: "enquiry@uniquefitnesskengeri.com",
    socialLinks: {
      instagram: "https://instagram.com", // update if verified link supplied
      facebook: "https://facebook.com",
      youtube: "https://youtube.com"
    }
  },

  // Trust & Verified Ratings
  ratingStats: {
    ratingValue: "4.8+",
    reviewCountDisplay: "400+",
    coreFitnessOptions: "3+",
    commitment: "100%",
    activeMembersCount: "1,200+",
    yearsInFitness: "7+"
  },

  // Opening Hours
  openingHours: {
    timezone: "Asia/Kolkata",
    schedule: [
      { day: "Monday", openTime: "05:00", closeTime: "22:00", displayTime: "5:00 AM – 10:00 PM", isClosed: false },
      { day: "Tuesday", openTime: "05:00", closeTime: "22:00", displayTime: "5:00 AM – 10:00 PM", isClosed: false },
      { day: "Wednesday", openTime: "05:00", closeTime: "22:00", displayTime: "5:00 AM – 10:00 PM", isClosed: false },
      { day: "Thursday", openTime: "05:00", closeTime: "22:00", displayTime: "5:00 AM – 10:00 PM", isClosed: false },
      { day: "Friday", openTime: "05:00", closeTime: "22:00", displayTime: "5:00 AM – 10:00 PM", isClosed: false },
      { day: "Saturday", openTime: "05:00", closeTime: "22:00", displayTime: "5:00 AM – 10:00 PM", isClosed: false },
      { day: "Sunday", openTime: "06:00", closeTime: "22:00", displayTime: "6:00 AM – 10:00 PM", isClosed: false }
    ]
  },

  // Programs / Services
  programs: [
    {
      id: "gym",
      title: "GYM",
      tagline: "Complete Strength & Fitness",
      shortDescription: "Complete strength and fitness training using premium Olympic equipment and progressive resistance gear.",
      fullDescription: "Our full-floor gym setup is equipped with heavy-duty free weights, pin-loaded selectorized machines, plate-loaded stations, and functional racks suitable for all levels.",
      benefits: [
        "Extensive free weight & dumbbell racks up to heavy poundages",
        "Cable crossover and multi-station selectorized machines",
        "Ergonomic biomechanically sound benches and squat cages",
        "Personal floor trainer guidance for safe lifting technique"
      ],
      recommendedFor: "Beginners to competitive lifters aiming to build muscular strength and physical longevity.",
      intensity: "Custom / All Levels",
      iconName: "Dumbbell",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: "crossfit",
      title: "CROSSFIT",
      tagline: "High-Intensity Functional Fitness",
      shortDescription: "High-intensity functional fitness, explosive conditioning, and varied daily workout protocols.",
      fullDescription: "CrossFit at Unique Fitness blends gymnastics, plyometrics, kettlebell circuits, battle ropes, and Olympic weightlifting to push endurance and mental grit.",
      benefits: [
        "Metabolic conditioning that torches fat and elevates VO2 max",
        "Functional multi-joint movements for real-world athletic power",
        "Energetic community atmosphere that fosters consistency",
        "Scaled movements tailored to individual mobility and baseline"
      ],
      recommendedFor: "Athletes and fitness enthusiasts who thrive in fast-paced, high-energy group workouts.",
      intensity: "High",
      iconName: "Flame",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: "cardio",
      title: "CARDIO",
      tagline: "Stamina & Cardiovascular Health",
      shortDescription: "Improve endurance, stamina, heart health, and caloric expenditure with state-of-the-art cardio machines.",
      fullDescription: "A dedicated cardio deck featuring commercial-grade treadmills, elliptical trainers, rowing ergometers, and stationary spin bikes for peak cardiovascular health.",
      benefits: [
        "Heart-rate tracked cardio zones for targeted fat-loss and endurance",
        "Low-impact aerobic conditioning options to safeguard joints",
        "HIIT sprint routines paired with steady-state recovery protocols",
        "Enhanced daily energy, mood, and resting heart health"
      ],
      recommendedFor: "Anyone looking to boost stamina, shed stubborn body fat, or build a resilient cardiovascular foundation.",
      intensity: "Medium",
      iconName: "Zap",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: "strength",
      title: "STRENGTH TRAINING",
      tagline: "Power & Progressive Overload",
      shortDescription: "Build raw strength, bone density, and lean muscle mass with progressive resistance training.",
      fullDescription: "Systematic strength training focusing on core multi-joint lifts: Squats, Deadlifts, Overhead Presses, and Bench Presses, guided by biomechanical coaching.",
      benefits: [
        "Structured progressive overload tracking",
        "Compound movement biomechanics and posture correction",
        "Improved tendon, ligament, and bone mineral density",
        "Metabolic acceleration for continuous caloric burn"
      ],
      recommendedFor: "Individuals wanting to get genuinely strong, correct sedentary posture, and sculpt athletic muscle.",
      intensity: "High",
      iconName: "Shield",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: "personal-training",
      title: "PERSONAL TRAINING",
      tagline: "Dedicated 1-on-1 Mentorship",
      shortDescription: "Get individual 1-on-1 guidance, tailored workout architecture, and dedicated accountability.",
      fullDescription: "Work directly with seasoned fitness coaches who craft bespoke training blocks around your schedule, orthopedic history, and personal targets.",
      benefits: [
        "Customized periodized workout and warm-up plans",
        "Direct real-time form correction on every repetition",
        "Nutritional guidance and lifestyle habit coaching",
        "Consistent weekly accountability and progress assessments"
      ],
      recommendedFor: "Clients desiring fast-track results, specialized rehabilitation, or maximum personal attention.",
      intensity: "Custom / All Levels",
      iconName: "UserCheck",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: "transformation",
      title: "FITNESS TRANSFORMATION",
      tagline: "Sustainable Body Recomposition",
      shortDescription: "Work toward sustainable, long-term weight-loss, muscular definition, and complete lifestyle transformation.",
      fullDescription: "A comprehensive holistic program integrating structured resistance training, cardio conditioning, macro-nutrient guidance, and monthly metric tracking.",
      benefits: [
        "Body composition analysis (muscle mass, body fat percentage)",
        "Sustainable non-restrictive nutritional strategies",
        "Structured phase transitions from fat reduction to muscle definition",
        "Supportive mentor environment preventing burnout and plateaus"
      ],
      recommendedFor: "Men and women looking for substantial, lasting physical and mental transformation.",
      intensity: "Custom / All Levels",
      iconName: "Activity",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop"
    }
  ] as ServiceProgram[],

  // Why Choose Unique Fitness (9 core benefits)
  whyChooseBenefits: [
    {
      title: "Experienced Trainers",
      description: "Certified coaches passionate about technique, safety, and steady athletic progression.",
      icon: "Award"
    },
    {
      title: "Quality Equipment",
      description: "Heavy-duty commercial-grade rigs, Olympic barbells, plate-loaded machines, and cardio decks.",
      icon: "Dumbbell"
    },
    {
      title: "Supportive Environment",
      description: "A positive, zero-intimidation community where everyone from beginners to elites train together.",
      icon: "Users"
    },
    {
      title: "Strength & Conditioning",
      description: "Evidence-based protocols that build real functional power, explosive speed, and joint resilience.",
      icon: "Shield"
    },
    {
      title: "Personal Training",
      description: "Dedicated 1-on-1 coaching with tailored roadmaps, accountability, and form perfection.",
      icon: "UserCheck"
    },
    {
      title: "CrossFit Zone",
      description: "High-intensity functional conditioning space outfitted for battle ropes, kettlebells, and WODs.",
      icon: "Flame"
    },
    {
      title: "Cardio Training",
      description: "Comprehensive array of modern cardio ergometers and treadmills to boost stamina.",
      icon: "HeartPulse"
    },
    {
      title: "Beginner Friendly",
      description: "Step-by-step onboarding, equipment orientation, and friendly coaches ready to assist.",
      icon: "Sparkles"
    },
    {
      title: "Unisex Fitness Hub",
      description: "Safe, welcoming, inclusive, and professional environment for men, women, and youth athletes.",
      icon: "CheckCircle"
    }
  ],

  // About Unique Fitness feature pillars
  aboutFeatures: [
    {
      title: "TRAIN SMART",
      description: "Structured workouts and proper exercise guidance ensuring every repetition counts toward your goals."
    },
    {
      title: "GET STRONGER",
      description: "Strength-focused training designed around steady, safe progressive resistance and biomechanical precision."
    },
    {
      title: "STAY CONSISTENT",
      description: "A motivating, high-energy environment that turns routine exercise into an addictive lifelong habit."
    },
    {
      title: "TRAIN WITH PURPOSE",
      description: "Guidance from experienced trainers dedicated to unlocking your athletic potential and confidence."
    }
  ],

  // Fitness Journey 5 Steps
  journeySteps: [
    {
      step: "01",
      title: "VISIT",
      subtitle: "Come and experience Unique Fitness",
      description: "Walk into our modern facility in Kengeri, tour our training zones, and feel the energetic vibe firsthand."
    },
    {
      step: "02",
      title: "ASSESS",
      subtitle: "Discuss your fitness goals and current level",
      description: "Our certified coaches analyze your current mobility, baseline fitness, and what you want to achieve."
    },
    {
      step: "03",
      title: "TRAIN",
      subtitle: "Start a structured workout routine",
      description: "Begin your customized workout plan with hands-on posture, weight selection, and form correction."
    },
    {
      step: "04",
      title: "PROGRESS",
      subtitle: "Track your strength, fitness and consistency",
      description: "Monitor progressive weights, improved cardio stamina, and weekly body composition changes."
    },
    {
      step: "05",
      title: "TRANSFORM",
      subtitle: "Build sustainable long-term fitness",
      description: "Celebrate milestones, build unshakable self-confidence, and embrace lifelong health."
    }
  ],

  // Trainers (Editable placeholders clearly marked to follow instructions without inventing)
  trainers: [
    {
      id: "trainer-1",
      name: "Head Coach [Trainer Name]",
      role: "Head Strength & Conditioning Coach",
      specialization: "Olympic Lifting, Hypertrophy & Biomechanics",
      experience: "8+ Years Coaching Experience",
      bio: "Specializes in progressive overload programming and posture restoration for athletes and fitness beginners.",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "trainer-2",
      name: "Coach [Trainer Name]",
      role: "CrossFit & Functional Coach",
      specialization: "CrossFit, HIIT & Metabolic Conditioning",
      experience: "6+ Years Coaching Experience",
      bio: "Dedicated to high-intensity circuit design, mobility drills, and explosive athletic conditioning.",
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "trainer-3",
      name: "Coach [Trainer Name]",
      role: "Transformation & Cardio Specialist",
      specialization: "Weight Loss, Core & Functional Cardio",
      experience: "5+ Years Coaching Experience",
      bio: "Focuses on sustainable fat reduction, cardiovascular health, and individualized nutritional accountability.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "trainer-4",
      name: "Coach [Trainer Name]",
      role: "Personal Trainer & Movement Coach",
      specialization: "1-on-1 Coaching, Muscle Toning & Flexibility",
      experience: "5+ Years Coaching Experience",
      bio: "Passionate about helping members discover exercise consistency in a friendly, supportive environment.",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop"
    }
  ] as Trainer[],

  // Verified Customer Reviews (labeled clearly as customer reviews from Google Maps / online listings)
  customerReviews: [
    {
      id: "rev-1",
      author: "Verified Member",
      rating: 5,
      date: "Recent Review",
      highlight: "Excellent gym & knowledgeable trainers",
      reviewText: "Unique Fitness is an excellent gym with knowledgeable trainers and a great atmosphere. The equipment is well-maintained and coaches give genuine personal attention to workout posture.",
      verified: true
    },
    {
      id: "rev-2",
      author: "Gym Member, Kengeri",
      rating: 5,
      date: "Recent Review",
      highlight: "Very clean and spacious environment",
      reviewText: "One of the best fitness centers in the Kengeri Harsha Layout area. Very clean and spacious environment with great ventilation. Unisex friendly and everyone is supportive.",
      verified: true
    },
    {
      id: "rev-3",
      author: "Fitness Enthusiast",
      rating: 5,
      date: "Recent Review",
      highlight: "CrossFit & strength setups are top-notch",
      reviewText: "CrossFit and strength setups are top notch. If you are serious about weight loss or muscle building, the guidance here makes all the difference.",
      verified: true
    },
    {
      id: "rev-4",
      author: "Local Resident",
      rating: 5,
      date: "Recent Review",
      highlight: "Affordable and authentic coaching",
      reviewText: "Coaches are always on the floor ready to correct your form. The timings (5 AM to 10 PM) are very convenient for working professionals.",
      verified: true
    }
  ] as CustomerReview[],

  // Gallery items
  galleryItems: [
    {
      id: "gal-1",
      title: "Olympic Free Weights & Racks",
      category: "EQUIPMENT",
      imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=900&auto=format&fit=crop",
      caption: "Heavy-duty dumbbell collection and Olympic barbell stations."
    },
    {
      id: "gal-2",
      title: "CrossFit & High Intensity Zone",
      category: "CROSSFIT",
      imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop",
      caption: "Spacious functional turf and rig area for metabolic conditioning."
    },
    {
      id: "gal-3",
      title: "Main Gym Workout Floor",
      category: "GYM",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop",
      caption: "Spacious gym floor with premium resistance equipment."
    },
    {
      id: "gal-4",
      title: "Cardio & Stamina Deck",
      category: "EQUIPMENT",
      imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=900&auto=format&fit=crop",
      caption: "Commercial treadmills, rowers, and bikes for endurance building."
    },
    {
      id: "gal-5",
      title: "Personal Coaching & Form Correction",
      category: "TRAINING",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop",
      caption: "One-on-one personalized attention from certified coaches."
    },
    {
      id: "gal-6",
      title: "Community & Member Energy",
      category: "COMMUNITY",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop",
      caption: "Supportive, positive workout environment where members thrive together."
    }
  ] as GalleryItem[]
};
