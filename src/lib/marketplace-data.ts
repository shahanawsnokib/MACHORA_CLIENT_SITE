import {
  Building2,
  HardHat,
  Hammer,
  MoveUpRight,
  Package,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";

export const equipmentCategories = [
  {
    name: "Earthmoving",
    description: "Excavators, loaders, and backhoes for every site.",
    icon: HardHat,
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Lifting",
    description: "Cranes and lifting gear for jobs big and small.",
    icon: MoveUpRight,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Transport",
    description: "Move materials and equipment between sites.",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Site essentials",
    description: "Practical tools and equipment for daily work.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Power",
    description: "Generators and reliable power for remote sites.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Concrete",
    description: "Mixers and tools for concrete and masonry work.",
    icon: Hammer,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Material handling",
    description: "Move, stack, and store materials with less effort.",
    icon: Package,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Access equipment",
    description: "Reach elevated work areas with confidence.",
    icon: Warehouse,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
  },
];

export const equipmentListings = [
  {
    name: "Hydraulic Excavator",
    model: "Komatsu PC200 · 20 ton",
    category: "Earthmoving",
    location: "Dhaka",
    dailyRate: "12,000",
    added: "Added today",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "All-terrain Mobile Crane",
    model: "Tadano GR-300 · 30 ton",
    category: "Lifting",
    location: "Chattogram",
    dailyRate: "28,000",
    added: "Added today",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Tipper Truck",
    model: "Hino 500 · 10 wheel",
    category: "Transport",
    location: "Gazipur",
    dailyRate: "9,500",
    added: "Added yesterday",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Diesel Generator",
    model: "Perkins · 100 kVA",
    category: "Power",
    location: "Narayanganj",
    dailyRate: "5,000",
    added: "Added yesterday",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Concrete Mixer",
    model: "Twin-shaft · 500 L",
    category: "Concrete",
    location: "Dhaka",
    dailyRate: "2,800",
    added: "Added 2 days ago",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Forklift",
    model: "Toyota 8FD · 3 ton",
    category: "Material handling",
    location: "Sylhet",
    dailyRate: "4,500",
    added: "Added 3 days ago",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85",
  },
];
