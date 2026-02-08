import {
  FileSearch,
  Share2,
  Settings,
  Sparkles,
  Link2,
  Scan,
  Globe,
  Tag,
  Image,
  Code,
  CheckCircle,
  Zap,
  Shield,
  Clock,
} from "lucide-react"

export const features = [
  {
    icon: FileSearch,
    title: "Metadata Inspection",
    description:
      "Check title tags, meta descriptions, Open Graph properties, Twitter Card tags, and more. Know exactly what search engines and social platforms see.",
  },
  {
    icon: Share2,
    title: "Social Media Preview",
    description:
      "See how your page looks when shared on Facebook, X/Twitter, Discord, and Slack. Preview the link cards before you post.",
  },
  {
    icon: Settings,
    title: "Technical SEO Analysis",
    description:
      "Check robots.txt, sitemap availability, canonical URLs, viewport settings, charset, and other technical factors that affect your rankings.",
  },
]

export const steps = [
  { icon: Link2, label: "Paste any URL" },
  { icon: Scan, label: "AI analyzes content" },
  { icon: Sparkles, label: "Get optimized metadata" },
]

export const metadataChecks = [
  { icon: Globe, label: "Open Graph Tags" },
  { icon: Tag, label: "Meta Title & Description" },
  { icon: Image, label: "OG Images & Favicons" },
  { icon: Share2, label: "Twitter Card Tags" },
  { icon: Code, label: "Schema & Structured Data" },
  { icon: Settings, label: "Robots.txt & Sitemap" },
]

export const benefits = [
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get a complete metadata report in seconds. No signup or installation required.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "We don't store your URLs or metadata results. All analysis happens on demand.",
  },
  {
    icon: CheckCircle,
    title: "Comprehensive Coverage",
    description:
      "50+ metadata fields checked across SEO, social media, and technical categories.",
  },
  {
    icon: Clock,
    title: "Always Up to Date",
    description:
      "Fetches live data directly from your pages. No cached or outdated results.",
  },
]