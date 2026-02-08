"use client"

import Link from "next/link"
import * as motion from "motion/react-client"
import {
  ArrowRight,
  Sparkles,
  BotMessageSquare,
} from "lucide-react"
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Separator,
} from "@/shared/ui"
import { Navbar } from "@/widgets/navbar"
import { benefits, features, metadataChecks, steps } from "@/entities/homepage"
import { Footer } from "@/widgets/footer"


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0 },
}

const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0 },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const floatingAnimation = {
  y: [-6, 6, -6],
  transition: {
    duration: 4,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut" as const,
  },
}

const pulseGlow = {
  scale: [1, 1.05, 1],
  opacity: [0.5, 1, 0.5],
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut" as const,
  },
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mx-auto max-w-4xl px-4 py-24 text-center"
      >
        <motion.div variants={scaleUp} transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}>
          <Badge variant="secondary" className="mb-4">
            Free &amp; Open Source
          </Badge>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold tracking-tight sm:text-6xl"
        >
          Check Your Website&apos;s
          <br />
          <span className="text-muted-foreground">Metadata &amp; SEO</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Analyze metadata, Open Graph tags, Twitter Cards, and technical SEO
          data from any URL. See how your pages appear on social media and
          search engines before you share them.
        </motion.p>
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <Button asChild size="lg">
            <Link href="/metadata">
              Start Checking
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#features">Learn More</a>
          </Button>
        </motion.div>
      </motion.section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight"
          >
            Everything You Need to Audit Your SEO
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-3 text-muted-foreground"
          >
            One tool to inspect all the metadata that matters for search engines
            and social platforms.
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={i === 0 ? slideInLeft : i === 2 ? slideInRight : fadeUp}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <motion.div
                    className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="size-5 text-primary" />
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* AI Feature Highlight */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <Card className="relative overflow-hidden border-2 border-primary/20">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
            <CardContent className="relative flex flex-col items-center gap-6 py-16 text-center md:py-20">
              <motion.div variants={scaleUp} transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}>
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="size-3" />
                  Now Available
                </Badge>
              </motion.div>
              <motion.div
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <motion.div
                  animate={pulseGlow}
                  className="absolute inset-0 rounded-2xl bg-primary/10"
                />
                <motion.div
                  animate={floatingAnimation}
                  className="relative flex size-16 items-center justify-center rounded-2xl bg-primary/10"
                >
                  <BotMessageSquare className="size-8 text-primary" />
                </motion.div>
              </motion.div>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="max-w-2xl space-y-4"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  AI-Powered SEO Suggestions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Give MetaChecker a URL and let AI analyze your page content to
                  generate optimized metadata — better titles, descriptions, and
                  Open Graph tags tailored to improve your search rankings and
                  social engagement.
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-3 sm:flex-row"
              >
                {steps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    {i > 0 && (
                      <Separator
                        orientation="vertical"
                        className="hidden h-4 sm:block"
                      />
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <step.icon className="size-4" />
                      <span>{step.label}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div
                variants={scaleUp}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="mt-2"
              >
                <Button asChild size="lg" className="gap-2">
                  <Link href="/generate">
                    <Sparkles className="size-4" />
                    Try AI Generate
                  </Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* What We Check */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight"
          >
            What We Check
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-3 text-muted-foreground"
          >
            A single scan covers all the metadata your pages need to rank and
            look great everywhere.
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerFast}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6"
        >
          {metadataChecks.map((item) => (
            <motion.div
              key={item.label}
              variants={scaleUp}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              className="flex flex-col items-center gap-3 rounded-xl border border-border p-6 text-center transition-colors hover:bg-muted/50"
            >
              <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                <item.icon className="size-6 text-primary" />
              </motion.div>
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-12 text-center"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight"
            >
              Why MetaChecker?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-3 text-muted-foreground"
            >
              Built for developers, marketers, and anyone who cares about SEO.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-8 sm:grid-cols-2"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                variants={i % 2 === 0 ? slideInLeft : slideInRight}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                className="flex gap-4"
              >
                <motion.div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <benefit.icon className="size-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight"
          >
            Ready to Check Your Metadata?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-3 max-w-xl text-muted-foreground"
          >
            Paste any URL and get a full SEO metadata report in seconds. Free,
            no signup required.
          </motion.p>
          <motion.div
            variants={scaleUp}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            className="mt-8"
          >
            <Button asChild size="lg">
              <Link href="/metadata">
                Start Checking
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
      <Footer/>
    </div>
  )
}
