import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Building2, Leaf, Heart, Microscope, Sprout, Sparkles, Mail, ExternalLink, Star, TrendingUp, Globe, Users, Award, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Textarea } from './components/ui/textarea';
import './App.css';

// Comprehensive database from CSV data
// Comprehensive database from CSV data
const companiesData = [
  {
    id: 1,
    name: "Meati Foods",
    industry: "Food & Beverage",
    country: "USA",
    description: "Mycelium-based meat alternatives, steaks, chicken",
    founded: "Unknown",
    employees: "2019",
    funding: "Series C",
    specialties: ["$50M-100M"],
    website: "https://meati.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://meati.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium-based meat alternatives", "steaks", "chicken"],
    certifications: ["Mycelium fermentation"],
    analysis: "High in food & beverage with high innovation level and growth sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Consumers/Retail"],
    revenueModel: "B2C/Retail with focus on north america"
  },
  {
    id: 2,
    name: "Nature's Fynd",
    industry: "Food & Beverage",
    country: "USA",
    description: "Fy protein from volcanic microorganism, dairy alternatives",
    founded: "Unknown",
    employees: "2012",
    funding: "Series B",
    specialties: ["$10M-50M"],
    website: "https://naturesfynd.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://naturesfynd.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Fy protein from volcanic microorganism", "dairy alternatives"],
    certifications: ["Fy protein technology"],
    analysis: "High in food & beverage with high innovation level and growth sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Health-conscious consumers"],
    revenueModel: "B2C/Retail with focus on north america"
  },
  {
    id: 3,
    name: "The Better Meat Co.",
    industry: "Food & Beverage",
    country: "USA",
    description: "Rhiza mycelium protein, B2B ingredients",
    founded: "Unknown",
    employees: "2018",
    funding: "Series A",
    specialties: ["$1M-10M"],
    website: "https://bettermeat.co",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://bettermeat.co",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Rhiza mycelium protein", "B2B ingredients"],
    certifications: ["Rhiza mycelium"],
    analysis: "High in food & beverage with high innovation level and early growth sustainability focus.",
    businessModel: "B2B/Ingredients",
    partnerships: ["Food manufacturers"],
    revenueModel: "B2B/Ingredients with focus on north america"
  },
  {
    id: 4,
    name: "Libre Foods",
    industry: "Food & Beverage",
    country: "USA",
    description: "Plant-based bacon, mycelium-enhanced products",
    founded: "Unknown",
    employees: "2020",
    funding: "Seed",
    specialties: ["$1M-10M"],
    website: "https://librefoods.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://librefoods.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Plant-based bacon", "mycelium-enhanced products"],
    certifications: ["Mycelium enhancement"],
    analysis: "Medium in food & beverage with high innovation level and early stage sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Plant-based consumers"],
    revenueModel: "B2C/Retail with focus on north america"
  },
  {
    id: 5,
    name: "Atlast Food Co.",
    industry: "Food & Beverage",
    country: "USA",
    description: "Mycelium-based whole cuts, steaks",
    founded: "Unknown",
    employees: "2019",
    funding: "Series A",
    specialties: ["$10M-50M"],
    website: "https://atlastfood.co",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://atlastfood.co",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium-based whole cuts", "steaks"],
    certifications: ["Mycelium whole cuts"],
    analysis: "High in food & beverage with high innovation level and growth sustainability focus.",
    businessModel: "B2B/B2C",
    partnerships: ["Restaurants/Retail"],
    revenueModel: "B2B/B2C with focus on north america"
  },
  {
    id: 6,
    name: "Kinoko Labs",
    industry: "Food & Beverage",
    country: "USA",
    description: "Mycelium ingredients, fermentation platform",
    founded: "Unknown",
    employees: "2021",
    funding: "Seed",
    specialties: ["$1M-10M"],
    website: "https://kinoko.bio",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://kinoko.bio",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium ingredients", "fermentation platform"],
    certifications: ["Fermentation technology"],
    analysis: "High in food & beverage with high innovation level and early stage sustainability focus.",
    businessModel: "B2B/Ingredients",
    partnerships: ["Food companies"],
    revenueModel: "B2B/Ingredients with focus on north america"
  },
  {
    id: 7,
    name: "Smallhold",
    industry: "Food & Beverage",
    country: "USA",
    description: "Organic mushroom farms network, fresh mushrooms",
    founded: "Unknown",
    employees: "2017",
    funding: "Series A",
    specialties: ["$10M-50M"],
    website: "https://smallhold.com",
    affiliateProgram: true,
    affiliateRate: "No",
    affiliateLink: "https://smallhold.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Organic mushroom farms network", "fresh mushrooms"],
    certifications: ["Urban farming"],
    analysis: "Medium in food & beverage with high innovation level and growth sustainability focus.",
    businessModel: "B2B/B2C",
    partnerships: ["Restaurants/Retail"],
    revenueModel: "B2B/B2C with focus on brooklyn, austin, la"
  },
  {
    id: 8,
    name: "MycoWorks",
    industry: "Materials & Packaging",
    country: "USA",
    description: "Fine Mycelium leather alternatives, luxury materials",
    founded: "Unknown",
    employees: "2013",
    funding: "Series C",
    specialties: ["$10M-50M"],
    website: "https://mycoworks.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://mycoworks.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Fine Mycelium leather alternatives", "luxury materials"],
    certifications: ["Fine Mycelium technology"],
    analysis: "High in materials & packaging with high innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Luxury fashion"],
    revenueModel: "B2B with focus on global"
  },
  {
    id: 9,
    name: "Ecovative",
    industry: "Materials & Packaging",
    country: "USA",
    description: "Mycelium packaging, materials, food ingredients",
    founded: "Unknown",
    employees: "2007",
    funding: "Series B",
    specialties: ["$10M-50M"],
    website: "https://ecovative.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://ecovative.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium packaging", "materials", "food ingredients"],
    certifications: ["Mycelium technology"],
    analysis: "High in materials & packaging with high innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Packaging/Food"],
    revenueModel: "B2B with focus on global"
  },
  {
    id: 10,
    name: "Bolt Threads",
    industry: "Materials & Packaging",
    country: "USA",
    description: "Mycelium leather, sustainable materials",
    founded: "Unknown",
    employees: "2009",
    funding: "Series C",
    specialties: ["$10M-50M"],
    website: "https://boltthreads.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://boltthreads.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium leather", "sustainable materials"],
    certifications: ["Mycelium materials"],
    analysis: "High in materials & packaging with high innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Fashion/Apparel"],
    revenueModel: "B2B with focus on global"
  },
  {
    id: 11,
    name: "Grown Bio",
    industry: "Materials & Packaging",
    country: "USA",
    description: "Mycelium materials, sustainable alternatives",
    founded: "Unknown",
    employees: "2020",
    funding: "Seed",
    specialties: ["$1M-10M"],
    website: "https://grown.bio",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://grown.bio",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium materials", "sustainable alternatives"],
    certifications: ["Mycelium cultivation"],
    analysis: "High in materials & packaging with high innovation level and early stage sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Materials industry"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 12,
    name: "Magical Mushroom Company",
    industry: "Materials & Packaging",
    country: "USA",
    description: "Mycelium packaging, sustainable packaging solutions",
    founded: "Unknown",
    employees: "2019",
    funding: "Seed",
    specialties: ["$1M-10M"],
    website: "https://magicalmushroom.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://magicalmushroom.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium packaging", "sustainable packaging solutions"],
    certifications: ["Mycelium packaging"],
    analysis: "Medium in materials & packaging with high innovation level and early stage sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Packaging industry"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 13,
    name: "Four Sigmatic",
    industry: "Health & Wellness",
    country: "USA",
    description: "Mushroom coffee, supplements, functional foods",
    founded: "10%+",
    employees: "2012",
    funding: "Series A",
    specialties: ["$50M-100M"],
    website: "https://foursigmatic.com",
    affiliateProgram: false,
    affiliateRate: "Yes",
    affiliateLink: "https://foursigmatic.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom coffee", "supplements", "functional foods"],
    certifications: ["Functional mushrooms"],
    analysis: "Medium in health & wellness with medium innovation level and growth sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Health-conscious consumers"],
    revenueModel: "B2C/Retail with focus on global"
  },
  {
    id: 14,
    name: "Host Defense",
    industry: "Health & Wellness",
    country: "USA",
    description: "Mushroom supplements, immune support products",
    founded: "Unknown",
    employees: "1999",
    funding: "Private",
    specialties: ["$50M-100M"],
    website: "https://hostdefense.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://hostdefense.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom supplements", "immune support products"],
    certifications: ["Mushroom extracts"],
    analysis: "Medium in health & wellness with medium innovation level and mature sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Health/Wellness consumers"],
    revenueModel: "B2C/Retail with focus on global"
  },
  {
    id: 15,
    name: "Real Mushrooms",
    industry: "Health & Wellness",
    country: "Canada",
    description: "Organic mushroom extracts, supplements",
    founded: "20%",
    employees: "2015",
    funding: "Private",
    specialties: ["$10M-50M"],
    website: "https://realmushrooms.com",
    affiliateProgram: false,
    affiliateRate: "Yes",
    affiliateLink: "https://realmushrooms.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Organic mushroom extracts", "supplements"],
    certifications: ["Mushroom extraction"],
    analysis: "Medium in health & wellness with medium innovation level and growth sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Health enthusiasts"],
    revenueModel: "B2C/Retail with focus on global"
  },
  {
    id: 16,
    name: "Mushroom Revival",
    industry: "Health & Wellness",
    country: "USA",
    description: "Mushroom supplements, tinctures, powders",
    founded: "15%",
    employees: "2018",
    funding: "Private",
    specialties: ["$5M-10M"],
    website: "https://mushroomrevival.com",
    affiliateProgram: false,
    affiliateRate: "Yes",
    affiliateLink: "https://mushroomrevival.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom supplements", "tinctures", "powders"],
    certifications: ["Mushroom processing"],
    analysis: "Medium in health & wellness with medium innovation level and growth sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Wellness consumers"],
    revenueModel: "B2C/Retail with focus on north america"
  },
  {
    id: 17,
    name: "FreshCap Mushrooms",
    industry: "Health & Wellness",
    country: "Canada",
    description: "Mushroom supplements, educational content",
    founded: "10-20%",
    employees: "2017",
    funding: "Private",
    specialties: ["$1M-10M"],
    website: "https://freshcap.com",
    affiliateProgram: false,
    affiliateRate: "Yes",
    affiliateLink: "https://freshcap.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom supplements", "educational content"],
    certifications: ["Mushroom extracts"],
    analysis: "Medium in health & wellness with medium innovation level and growth sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Health enthusiasts"],
    revenueModel: "B2C/Retail with focus on global"
  },
  {
    id: 18,
    name: "Om Mushroom Superfood",
    industry: "Health & Wellness",
    country: "USA",
    description: "Mushroom powders, supplements, functional foods",
    founded: "10%",
    employees: "2010",
    funding: "Private",
    specialties: ["$20M-50M"],
    website: "https://ommushrooms.com",
    affiliateProgram: false,
    affiliateRate: "Yes",
    affiliateLink: "https://ommushrooms.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom powders", "supplements", "functional foods"],
    certifications: ["Mushroom cultivation"],
    analysis: "Medium in health & wellness with medium innovation level and growth sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Health/Wellness consumers"],
    revenueModel: "B2C/Retail with focus on north america"
  },
  {
    id: 19,
    name: "Alice Mushrooms",
    industry: "Health & Wellness",
    country: "USA",
    description: "Functional mushroom chocolates, nootropics",
    founded: "15%",
    employees: "2020",
    funding: "Seed",
    specialties: ["$1M-10M"],
    website: "https://alicemushrooms.com",
    affiliateProgram: false,
    affiliateRate: "Yes",
    affiliateLink: "https://alicemushrooms.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Functional mushroom chocolates", "nootropics"],
    certifications: ["Functional mushrooms"],
    analysis: "High in health & wellness with medium innovation level and early stage sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Wellness consumers"],
    revenueModel: "B2C/Retail with focus on north america"
  },
  {
    id: 20,
    name: "MUD/WTR",
    industry: "Health & Wellness",
    country: "USA",
    description: "Mushroom coffee alternatives, wellness drinks",
    founded: "Unknown",
    employees: "2018",
    funding: "Series A",
    specialties: ["$20M-50M"],
    website: "https://mudwtr.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://mudwtr.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom coffee alternatives", "wellness drinks"],
    certifications: ["Mushroom blends"],
    analysis: "Medium in health & wellness with medium innovation level and growth sustainability focus.",
    businessModel: "B2C/Retail",
    partnerships: ["Coffee alternatives"],
    revenueModel: "B2C/Retail with focus on north america"
  },
  {
    id: 21,
    name: "Hexagon Bio",
    industry: "Biotechnology",
    country: "USA",
    description: "AI-driven drug discovery, mushroom compounds",
    founded: "Unknown",
    employees: "2018",
    funding: "Series A",
    specialties: ["$5M-10M"],
    website: "https://hexagonbio.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://hexagonbio.com",
    tier: "Tier 3",
    rating: 3,
    keyProducts: ["AI-driven drug discovery", "mushroom compounds"],
    certifications: ["AI drug discovery"],
    analysis: "High in biotechnology with low innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Pharmaceutical companies"],
    revenueModel: "B2B with focus on global"
  },
  {
    id: 22,
    name: "Chinova Bioworks",
    industry: "Biotechnology",
    country: "Canada",
    description: "Natural preservatives from mushrooms, food safety",
    founded: "Unknown",
    employees: "2016",
    funding: "Series A",
    specialties: ["$1M-10M"],
    website: "https://chinovabioworks.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://chinovabioworks.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Natural preservatives from mushrooms", "food safety"],
    certifications: ["Mushroom extraction"],
    analysis: "High in biotechnology with high innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Food manufacturers"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 23,
    name: "Azoth Biotech",
    industry: "Biotechnology",
    country: "USA",
    description: "Mushroom-based pharmaceuticals, drug development",
    founded: "Unknown",
    employees: "2019",
    funding: "Seed",
    specialties: ["$1M-10M"],
    website: "https://azothbiotech.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://azothbiotech.com",
    tier: "Tier 3",
    rating: 3,
    keyProducts: ["Mushroom-based pharmaceuticals", "drug development"],
    certifications: ["Pharmaceutical development"],
    analysis: "High in biotechnology with low innovation level and early stage sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Pharmaceutical industry"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 24,
    name: "Spora Health",
    industry: "Biotechnology",
    country: "USA",
    description: "Psychedelic therapy, mushroom-based treatments",
    founded: "Unknown",
    employees: "2020",
    funding: "Series A",
    specialties: ["$1M-10M"],
    website: "https://sporahealth.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://sporahealth.com",
    tier: "Tier 3",
    rating: 3,
    keyProducts: ["Psychedelic therapy", "mushroom-based treatments"],
    certifications: ["Digital therapeutics"],
    analysis: "High in biotechnology with low innovation level and growth sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Healthcare providers"],
    revenueModel: "B2C with focus on north america"
  },
  {
    id: 25,
    name: "Phillips Mushroom Farms",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Specialty mushrooms, commercial cultivation",
    founded: "Unknown",
    employees: "1927",
    funding: "Private",
    specialties: ["$50M-100M"],
    website: "https://phillipsmushroomfarms.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://phillipsmushroomfarms.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Specialty mushrooms", "commercial cultivation"],
    certifications: ["Mushroom cultivation"],
    analysis: "Medium in agriculture & cultivation with medium innovation level and mature sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Restaurants/Retail"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 26,
    name: "Monterey Mushrooms",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Fresh mushrooms, organic mushrooms, distribution",
    founded: "Unknown",
    employees: "1971",
    funding: "Private",
    specialties: ["$100M+"],
    website: "https://montereymushrooms.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://montereymushrooms.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Fresh mushrooms", "organic mushrooms", "distribution"],
    certifications: ["Vertical integration"],
    analysis: "Medium in agriculture & cultivation with medium innovation level and mature sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Retail/Foodservice"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 27,
    name: "The Giorgi Companies",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Button mushrooms, large-scale production",
    founded: "Unknown",
    employees: "1960s",
    funding: "Private",
    specialties: ["$200M+"],
    website: "https://thegiorgicompanies.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://thegiorgicompanies.com",
    tier: "Tier 3",
    rating: 3,
    keyProducts: ["Button mushrooms", "large-scale production"],
    certifications: ["Industrial cultivation"],
    analysis: "Low in agriculture & cultivation with low innovation level and mature sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Wholesale/Retail"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 28,
    name: "R&R Cultivation",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Organic gourmet mushrooms, cultivation supplies",
    founded: "Unknown",
    employees: "2010",
    funding: "Private",
    specialties: ["$5M-10M"],
    website: "https://rrcultivation.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://rrcultivation.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Organic gourmet mushrooms", "cultivation supplies"],
    certifications: ["Organic cultivation"],
    analysis: "Medium in agriculture & cultivation with high innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Grocery/Restaurants"],
    revenueModel: "B2B with focus on midwest usa"
  },
  {
    id: 29,
    name: "Mycopia Mushrooms",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Organic specialty mushrooms, gourmet varieties",
    founded: "Unknown",
    employees: "1977",
    funding: "Private",
    specialties: ["$10M-50M"],
    website: "https://mycopia.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://mycopia.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Organic specialty mushrooms", "gourmet varieties"],
    certifications: ["Specialty cultivation"],
    analysis: "Medium in agriculture & cultivation with high innovation level and mature sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Fine dining/Gourmet"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 30,
    name: "Highline Mushrooms",
    industry: "Agriculture & Cultivation",
    country: "Canada",
    description: "Organic mushrooms, pesticide-free cultivation",
    founded: "Unknown",
    employees: "1980s",
    funding: "Private",
    specialties: ["$20M-50M"],
    website: "https://highlinemushrooms.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://highlinemushrooms.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Organic mushrooms", "pesticide-free cultivation"],
    certifications: ["Organic cultivation"],
    analysis: "Medium in agriculture & cultivation with high innovation level and mature sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Health-conscious consumers"],
    revenueModel: "B2B with focus on canada"
  },
  {
    id: 31,
    name: "North Spore",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Mushroom growing supplies, spawn, equipment",
    founded: "Unknown",
    employees: "2014",
    funding: "Private",
    specialties: ["$5M-10M"],
    website: "https://northspore.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://northspore.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom growing supplies", "spawn", "equipment"],
    certifications: ["Cultivation technology"],
    analysis: "Medium in agriculture & cultivation with medium innovation level and growth sustainability focus.",
    businessModel: "B2B/B2C",
    partnerships: ["Growers/Hobbyists"],
    revenueModel: "B2B/B2C with focus on global"
  },
  {
    id: 32,
    name: "Fungi Perfecti",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Mushroom spawn, research, education",
    founded: "5%",
    employees: "1980",
    funding: "Private",
    specialties: ["$10M-20M"],
    website: "https://fungi.com",
    affiliateProgram: false,
    affiliateRate: "Yes",
    affiliateLink: "https://fungi.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mushroom spawn", "research", "education"],
    certifications: ["Mycology research"],
    analysis: "High in agriculture & cultivation with high innovation level and mature sustainability focus.",
    businessModel: "B2B/B2C",
    partnerships: ["Researchers/Growers"],
    revenueModel: "B2B/B2C with focus on global"
  },
  {
    id: 33,
    name: "Field & Forest Products",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Certified organic spawn, growing supplies",
    founded: "Unknown",
    employees: "1990s",
    funding: "Private",
    specialties: ["$1M-5M"],
    website: "https://fieldforest.net",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://fieldforest.net",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Certified organic spawn", "growing supplies"],
    certifications: ["Organic spawn production"],
    analysis: "Medium in agriculture & cultivation with high innovation level and mature sustainability focus.",
    businessModel: "B2B/B2C",
    partnerships: ["Organic growers"],
    revenueModel: "B2B/B2C with focus on north america"
  },
  {
    id: 34,
    name: "Mushroom Mountain",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Spawn, kits, education, farm tours",
    founded: "Unknown",
    employees: "2005",
    funding: "Private",
    specialties: ["$1M-5M"],
    website: "https://mushroommountain.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://mushroommountain.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Spawn", "kits", "education"],
    certifications: ["Sustainable cultivation"],
    analysis: "Medium in agriculture & cultivation with high innovation level and growth sustainability focus.",
    businessModel: "B2B/B2C",
    partnerships: ["Educators/Growers"],
    revenueModel: "B2B/B2C with focus on southeast usa"
  },
  {
    id: 35,
    name: "Amycel",
    industry: "Agriculture & Cultivation",
    country: "Global",
    description: "Commercial spawn, strain development",
    founded: "Unknown",
    employees: "1960s",
    funding: "Private",
    specialties: ["$50M-100M"],
    website: "https://amycel.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://amycel.com",
    tier: "Tier 3",
    rating: 3,
    keyProducts: ["Commercial spawn", "strain development"],
    certifications: ["Strain development"],
    analysis: "High in agriculture & cultivation with low innovation level and mature sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Commercial growers"],
    revenueModel: "B2B with focus on global"
  },
  {
    id: 36,
    name: "Sharondale Mushroom Farm",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Organic spawn, consultation services",
    founded: "Unknown",
    employees: "1990s",
    funding: "Private",
    specialties: ["$1M-5M"],
    website: "https://sharondalefarm.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://sharondalefarm.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Organic spawn", "consultation services"],
    certifications: ["Organic cultivation"],
    analysis: "Medium in agriculture & cultivation with high innovation level and mature sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Organic growers"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 37,
    name: "Hollander Spawn",
    industry: "Agriculture & Cultivation",
    country: "Netherlands",
    description: "Mushroom spawn, global distribution",
    founded: "Unknown",
    employees: "1972",
    funding: "Private",
    specialties: ["$20M-50M"],
    website: "https://hollanderspawn.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://hollanderspawn.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom spawn", "global distribution"],
    certifications: ["Spawn production"],
    analysis: "Medium in agriculture & cultivation with medium innovation level and mature sustainability focus.",
    businessModel: "B2B",
    partnerships: ["International growers"],
    revenueModel: "B2B with focus on global"
  },
  {
    id: 38,
    name: "FarmBox Foods",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Container mushroom farms, automated systems",
    founded: "Unknown",
    employees: "2017",
    funding: "Series A",
    specialties: ["$1M-10M"],
    website: "https://farmboxfoods.com",
    affiliateProgram: true,
    affiliateRate: "No",
    affiliateLink: "https://farmboxfoods.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Container mushroom farms", "automated systems"],
    certifications: ["Container farming"],
    analysis: "High in agriculture & cultivation with high innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Urban farmers"],
    revenueModel: "B2B with focus on global"
  },
  {
    id: 39,
    name: "MyForest Foods",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Vertical mycelium farming, large-scale production",
    founded: "Unknown",
    employees: "2020",
    funding: "Series A",
    specialties: ["$5M-10M"],
    website: "https://myforestfoods.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://myforestfoods.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Vertical mycelium farming", "large-scale production"],
    certifications: ["Vertical farming"],
    analysis: "High in agriculture & cultivation with high innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Food manufacturers"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 40,
    name: "Mycelium.ag",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Agricultural investment, regenerative farming",
    founded: "Unknown",
    employees: "2019",
    funding: "Private",
    specialties: ["$5M-10M"],
    website: "https://mycelium.ag",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://mycelium.ag",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Agricultural investment", "regenerative farming"],
    certifications: ["Investment platform"],
    analysis: "Medium in agriculture & cultivation with high innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Investors/Farmers"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 41,
    name: "Shikohin",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Japanese mushroom skincare, premium products",
    founded: "Unknown",
    employees: "2020",
    funding: "Seed",
    specialties: ["$1M-5M"],
    website: "https://shikohin.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://shikohin.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Japanese mushroom skincare", "premium products"],
    certifications: ["Mushroom extracts"],
    analysis: "High in cosmetics & personal care with high innovation level and early stage sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Premium beauty consumers"],
    revenueModel: "B2C with focus on north america"
  },
  {
    id: 42,
    name: "Shroom Skincare",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Mycelium Glow serum, mushroom skincare",
    founded: "Unknown",
    employees: "2022",
    funding: "Seed",
    specialties: ["$1M-5M"],
    website: "https://shroomskincare.skin",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://shroomskincare.skin",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium Glow serum", "mushroom skincare"],
    certifications: ["Mushroom complexes"],
    analysis: "High in cosmetics & personal care with high innovation level and early stage sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Clean beauty consumers"],
    revenueModel: "B2C with focus on north america"
  },
  {
    id: 43,
    name: "Origins",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Dr. Weil Mega-Mushroom line, skincare",
    founded: "Unknown",
    employees: "1990",
    funding: "Public",
    specialties: ["$1B+"],
    website: "https://origins.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://origins.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Dr. Weil Mega-Mushroom line", "skincare"],
    certifications: ["Mushroom formulations"],
    analysis: "Medium in cosmetics & personal care with medium innovation level and mature sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Mainstream consumers"],
    revenueModel: "B2C with focus on global"
  },
  {
    id: 44,
    name: "HAOMA Earth",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Mycelium Collection, professional skincare",
    founded: "Unknown",
    employees: "2018",
    funding: "Private",
    specialties: ["$1M-5M"],
    website: "https://haomaearth.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://haomaearth.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium Collection", "professional skincare"],
    certifications: ["Mycelium technology"],
    analysis: "Medium in cosmetics & personal care with high innovation level and growth sustainability focus.",
    businessModel: "B2B/B2C",
    partnerships: ["Professional salons"],
    revenueModel: "B2B/B2C with focus on north america"
  },
  {
    id: 45,
    name: "Neon Hippie",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "7 Shroom Complex, luxury mushroom skincare",
    founded: "Unknown",
    employees: "2023",
    funding: "Seed",
    specialties: ["$1M-5M"],
    website: "https://neonhippie.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://neonhippie.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["7 Shroom Complex", "luxury mushroom skincare"],
    certifications: ["Proprietary mushroom complex"],
    analysis: "High in cosmetics & personal care with medium innovation level and early stage sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Luxury consumers"],
    revenueModel: "B2C with focus on north america"
  },
  {
    id: 46,
    name: "Sempera Organics",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Bulk mushroom ingredients, cosmetic supplies",
    founded: "Unknown",
    employees: "2015",
    funding: "Private",
    specialties: ["$1M-5M"],
    website: "https://semperaorganics.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://semperaorganics.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Bulk mushroom ingredients", "cosmetic supplies"],
    certifications: ["Bulk processing"],
    analysis: "Medium in cosmetics & personal care with high innovation level and growth sustainability focus.",
    businessModel: "B2B",
    partnerships: ["Cosmetic manufacturers"],
    revenueModel: "B2B with focus on north america"
  },
  {
    id: 47,
    name: "Sawubona Mycelium",
    industry: "Cosmetics & Personal Care",
    country: "South Africa",
    description: "Beta-glucan skincare, biotechnology products",
    founded: "Unknown",
    employees: "2021",
    funding: "Seed",
    specialties: ["$1M-5M"],
    website: "https://sawubona.co.za",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://sawubona.co.za",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Beta-glucan skincare", "biotechnology products"],
    certifications: ["Beta-glucan technology"],
    analysis: "High in cosmetics & personal care with high innovation level and early stage sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Skincare consumers"],
    revenueModel: "B2C with focus on south africa"
  },
  {
    id: 48,
    name: "blu beryl",
    industry: "Cosmetics & Personal Care",
    country: "South Africa",
    description: "Mycelium-inspired skincare, vegan products",
    founded: "Unknown",
    employees: "2020",
    funding: "Private",
    specialties: ["$500K-1M"],
    website: "https://bluberylskincare.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://bluberylskincare.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mycelium-inspired skincare", "vegan products"],
    certifications: ["Mycelium inspiration"],
    analysis: "Medium in cosmetics & personal care with high innovation level and early stage sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Natural beauty consumers"],
    revenueModel: "B2C with focus on south africa"
  },
  {
    id: 49,
    name: "Youth to the People",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Adaptogen Deep Moisture Cream, clean skincare",
    founded: "Unknown",
    employees: "2015",
    funding: "Private",
    specialties: ["$20M-50M"],
    website: "https://youthtothepeople.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://youthtothepeople.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Adaptogen Deep Moisture Cream", "clean skincare"],
    certifications: ["Adaptogenic ingredients"],
    analysis: "Medium in cosmetics & personal care with high innovation level and growth sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Clean beauty consumers"],
    revenueModel: "B2C with focus on north america"
  },
  {
    id: 50,
    name: "REN Clean Skincare",
    industry: "Cosmetics & Personal Care",
    country: "UK",
    description: "Evercalm Redness Relief Serum, clean formulations",
    founded: "Unknown",
    employees: "2000",
    funding: "Private",
    specialties: ["$50M-100M"],
    website: "https://renskincare.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://renskincare.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Evercalm Redness Relief Serum", "clean formulations"],
    certifications: ["Clean formulations"],
    analysis: "Medium in cosmetics & personal care with high innovation level and mature sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Clean beauty consumers"],
    revenueModel: "B2C with focus on global"
  },
  {
    id: 51,
    name: "Moon Juice",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Cosmic Cream, adaptogenic beauty products",
    founded: "Unknown",
    employees: "2011",
    funding: "Private",
    specialties: ["$10M-20M"],
    website: "https://moonjuice.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://moonjuice.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Cosmic Cream", "adaptogenic beauty products"],
    certifications: ["Adaptogenic beauty"],
    analysis: "Medium in cosmetics & personal care with high innovation level and growth sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Wellness consumers"],
    revenueModel: "B2C with focus on north america"
  },
  {
    id: 52,
    name: "Herbivore Botanicals",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Natural mushroom skincare, botanical products",
    founded: "Unknown",
    employees: "2011",
    funding: "Private",
    specialties: ["$10M-20M"],
    website: "https://herbivorebotanicals.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://herbivorebotanicals.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Natural mushroom skincare", "botanical products"],
    certifications: ["Botanical formulations"],
    analysis: "Medium in cosmetics & personal care with high innovation level and growth sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Natural beauty consumers"],
    revenueModel: "B2C with focus on north america"
  },
  {
    id: 53,
    name: "Chasin' Rabbits",
    industry: "Cosmetics & Personal Care",
    country: "South Korea",
    description: "Magic Beauty Shroom Toner, K-beauty products",
    founded: "Unknown",
    employees: "2018",
    funding: "Private",
    specialties: ["$1M-10M"],
    website: "https://chasinrabbits.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://chasinrabbits.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Magic Beauty Shroom Toner", "K-beauty products"],
    certifications: ["K-beauty innovation"],
    analysis: "High in cosmetics & personal care with medium innovation level and growth sustainability focus.",
    businessModel: "B2C",
    partnerships: ["K-beauty consumers"],
    revenueModel: "B2C with focus on asia/global"
  },
  {
    id: 54,
    name: "d'Alba",
    industry: "Cosmetics & Personal Care",
    country: "South Korea",
    description: "White Truffle First Spray Serum, luxury K-beauty",
    founded: "Unknown",
    employees: "2017",
    funding: "Private",
    specialties: ["$5M-10M"],
    website: "https://dalba.co.kr",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://dalba.co.kr",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["White Truffle First Spray Serum", "luxury K-beauty"],
    certifications: ["White truffle technology"],
    analysis: "High in cosmetics & personal care with medium innovation level and growth sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Luxury consumers"],
    revenueModel: "B2C with focus on asia/global"
  },
  {
    id: 55,
    name: "Innisfree",
    industry: "Cosmetics & Personal Care",
    country: "South Korea",
    description: "Mushroom skincare line, natural K-beauty",
    founded: "Unknown",
    employees: "2000",
    funding: "Public",
    specialties: ["$500M+"],
    website: "https://innisfree.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://innisfree.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Mushroom skincare line", "natural K-beauty"],
    certifications: ["Natural ingredients"],
    analysis: "Medium in cosmetics & personal care with high innovation level and mature sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Natural beauty consumers"],
    revenueModel: "B2C with focus on global"
  },
  {
    id: 56,
    name: "AmorePacific",
    industry: "Cosmetics & Personal Care",
    country: "South Korea",
    description: "Future Response Age Defense Creme, luxury skincare",
    founded: "Unknown",
    employees: "1945",
    funding: "Public",
    specialties: ["$3B+"],
    website: "https://amorepacific.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://amorepacific.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Future Response Age Defense Creme", "luxury skincare"],
    certifications: ["Advanced formulations"],
    analysis: "High in cosmetics & personal care with medium innovation level and mature sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Luxury consumers"],
    revenueModel: "B2C with focus on global"
  },
  {
    id: 57,
    name: "Shiseido",
    industry: "Cosmetics & Personal Care",
    country: "Japan",
    description: "Mushroom cosmetics, global beauty products",
    founded: "Unknown",
    employees: "1872",
    funding: "Public",
    specialties: ["$8B+"],
    website: "https://shiseido.com",
    affiliateProgram: false,
    affiliateRate: "No",
    affiliateLink: "https://shiseido.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom cosmetics", "global beauty products"],
    certifications: ["Advanced technology"],
    analysis: "High in cosmetics & personal care with medium innovation level and mature sustainability focus.",
    businessModel: "B2C",
    partnerships: ["Global consumers"],
    revenueModel: "B2C with focus on global"
  },
  {
    id: 58,
    name: "Mistyone",
    industry: "Franchise",
    country: "International",
    description: "Oyster mushroom cultivation, franchise system",
    founded: "Unknown",
    employees: "2020",
    funding: "Private",
    specialties: ["$1M-5M"],
    website: "https://instagram.com/mistyone",
    affiliateProgram: true,
    affiliateRate: "No",
    affiliateLink: "https://instagram.com/mistyone",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Oyster mushroom cultivation", "franchise system"],
    certifications: ["Cultivation technology"],
    analysis: "High in franchise with high innovation level and growth sustainability focus.",
    businessModel: "Franchise",
    partnerships: ["Franchise investors"],
    revenueModel: "Franchise with focus on international"
  },
  {
    id: 59,
    name: "Mushroom Mistri",
    industry: "Franchise",
    country: "India",
    description: "Heal with Meal concept, health-focused mushrooms",
    founded: "Unknown",
    employees: "2018",
    funding: "Private",
    specialties: ["$500K-1M"],
    website: "https://franchiseindia.com",
    affiliateProgram: true,
    affiliateRate: "No",
    affiliateLink: "https://franchiseindia.com",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Heal with Meal concept", "health-focused mushrooms"],
    certifications: ["Health applications"],
    analysis: "Medium in franchise with high innovation level and growth sustainability focus.",
    businessModel: "Franchise",
    partnerships: ["Health entrepreneurs"],
    revenueModel: "Franchise with focus on india"
  },
  {
    id: 60,
    name: "MistyRanch",
    industry: "Franchise",
    country: "International",
    description: "Contract cultivation, precision agriculture",
    founded: "Unknown",
    employees: "2019",
    funding: "Private",
    specialties: ["$1M-5M"],
    website: "https://bucolic.ltd",
    affiliateProgram: true,
    affiliateRate: "No",
    affiliateLink: "https://bucolic.ltd",
    tier: "Tier 1",
    rating: 3,
    keyProducts: ["Contract cultivation", "precision agriculture"],
    certifications: ["Precision cultivation"],
    analysis: "High in franchise with high innovation level and growth sustainability focus.",
    businessModel: "Franchise",
    partnerships: ["Agricultural entrepreneurs"],
    revenueModel: "Franchise with focus on international"
  },
  {
    id: 61,
    name: "Mellow Mushroom",
    industry: "Franchise",
    country: "USA",
    description: "Pizza restaurant, mushroom-themed dining",
    founded: "Unknown",
    employees: "1974",
    funding: "Private",
    specialties: ["$500M+"],
    website: "https://mellowmushroom.com",
    affiliateProgram: true,
    affiliateRate: "No",
    affiliateLink: "https://mellowmushroom.com",
    tier: "Tier 3",
    rating: 3,
    keyProducts: ["Pizza restaurant", "mushroom-themed dining"],
    certifications: ["Restaurant operations"],
    analysis: "Low in franchise with low innovation level and mature sustainability focus.",
    businessModel: "Franchise",
    partnerships: ["Restaurant investors"],
    revenueModel: "Franchise with focus on usa"
  }
];

const industries = [
  { id: 'all', name: 'All Industries', icon: Globe, count: 61 },
  { id: 'food-beverage', name: 'Food & Beverage', icon: Leaf, count: 7 },
  { id: 'materials', name: 'Materials & Packaging', icon: Building2, count: 5 },
  { id: 'health-wellness', name: 'Health & Wellness', icon: Heart, count: 8 },
  { id: 'biotechnology', name: 'Biotechnology', icon: Microscope, count: 4 },
  { id: 'agriculture', name: 'Agriculture & Cultivation', icon: Sprout, count: 16 },
  { id: 'cosmetics', name: 'Cosmetics & Personal Care', icon: Sparkles, count: 17 },
  { id: 'franchise', name: 'Franchise', icon: Users, count: 4 }
];

const stats = [
  { label: 'Companies Analyzed', value: '61+', icon: Building2 },
  { label: 'Countries Covered', value: '4', icon: Globe },
  { label: 'Industries Tracked', value: '7', icon: TrendingUp },
  { label: 'Expert Reviews', value: '61+', icon: Award }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('companies');
  const [suggestionForm, setSuggestionForm] = useState({
    companyName: '',
    website: '',
    industry: '',
    description: '',
    contactEmail: ''
  });

  const countries = useMemo(() => {
    const countrySet = new Set(companiesData.map(company => company.country));
    return ['all', ...Array.from(countrySet)];
  }, []);

  const filteredCompanies = useMemo(() => {
    return companiesData.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesIndustry = selectedIndustry === 'all' || 
                            (selectedIndustry === 'food-beverage' && company.industry === 'Food & Beverage') ||
                            (selectedIndustry === 'materials' && company.industry === 'Materials & Packaging') ||
                            (selectedIndustry === 'health-wellness' && company.industry === 'Health & Wellness') ||
                            (selectedIndustry === 'biotechnology' && company.industry === 'Biotechnology') ||
                            (selectedIndustry === 'agriculture' && company.industry === 'Agriculture & Cultivation') ||
                            (selectedIndustry === 'cosmetics' && company.industry === 'Cosmetics & Personal Care') ||
                            (selectedIndustry === 'franchise' && company.industry === 'Franchise');
      
      const matchesCountry = selectedCountry === 'all' || company.country === selectedCountry;
      const matchesTier = selectedTier === 'all' || company.tier === selectedTier;

      return matchesSearch && matchesIndustry && matchesCountry && matchesTier;
    });
  }, [searchTerm, selectedIndustry, selectedCountry, selectedTier]);

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    const subject = `New Company Suggestion: ${suggestionForm.companyName}`;
    const body = `Company Name: ${suggestionForm.companyName}
Website: ${suggestionForm.website}
Industry: ${suggestionForm.industry}
Description: ${suggestionForm.description}
Submitted by: ${suggestionForm.contactEmail}

Please review this company for inclusion in the mushrooms.ink database.`;
    
    window.location.href = `mailto:success@ednye.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowSuggestionForm(false);
    setSuggestionForm({ companyName: '', website: '', industry: '', description: '', contactEmail: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-amber-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-amber-700 bg-clip-text text-transparent">
                  Mushrooms.ink
                </h1>
                <p className="text-xs text-gray-600">Global Industry Authority</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setActiveSection('companies')}
                className={`font-medium ${activeSection === 'companies' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'}`}
              >
                Companies
              </button>
              <button 
                onClick={() => setActiveSection('industries')}
                className={`font-medium ${activeSection === 'industries' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'}`}
              >
                Industries
              </button>
              <button 
                onClick={() => setActiveSection('opportunities')}
                className={`font-medium ${activeSection === 'opportunities' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'}`}
              >
                Opportunities
              </button>
              <Button 
                onClick={() => setShowSuggestionForm(true)}
                variant="outline" 
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Suggest A Company
              </Button>
            </nav>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-green-200">
            <div className="px-4 py-3 space-y-3">
              <button 
                onClick={() => {setActiveSection('companies'); setMobileMenuOpen(false);}}
                className={`block font-medium ${activeSection === 'companies' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'}`}
              >
                Companies
              </button>
              <button 
                onClick={() => {setActiveSection('industries'); setMobileMenuOpen(false);}}
                className={`block font-medium ${activeSection === 'industries' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'}`}
              >
                Industries
              </button>
              <button 
                onClick={() => {setActiveSection('opportunities'); setMobileMenuOpen(false);}}
                className={`block font-medium ${activeSection === 'opportunities' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'}`}
              >
                Opportunities
              </button>
              <Button 
                onClick={() => setShowSuggestionForm(true)}
                variant="outline" 
                size="sm"
                className="w-full border-green-200 text-green-700 hover:bg-green-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Suggest A Company
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            The World's Most
            <span className="block bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
              Comprehensive Mushroom
            </span>
            Industry Database
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover 61+ companies across food, materials, health, biotechnology, agriculture, cosmetics, and franchise opportunities. 
            Expert analysis, verified reviews, and comprehensive industry insights in the rapidly growing fungi economy.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-green-100">
                <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      {activeSection === 'companies' && (
        <>
          {/* Search and Filters */}
          <section id="companies" className="py-8 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search companies, products, or technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-400"
                  />
                </div>
              </div>
              
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="border-green-200">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {industry.name} ({industry.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="border-green-200">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.filter(c => c !== 'all').map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger className="border-green-200">
                  <SelectValue placeholder="Quality Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="Tier 1">Tier 1 - Excellent</SelectItem>
                  <SelectItem value="Tier 2">Tier 2 - Good</SelectItem>
                  <SelectItem value="Tier 3">Tier 3 - Caution</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredCompanies.length} of {companiesData.length} companies
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-xl transition-all duration-300 border-green-100 hover:border-green-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 mb-2">
                        {company.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {company.industry}
                        </Badge>
                        <Badge variant="outline" className="border-amber-200 text-amber-700">
                          {company.country}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(company.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 line-clamp-3">
                    {company.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Founded:</span>
                      <span className="font-medium">{company.founded}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Funding:</span>
                      <span className="font-medium">{company.funding}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {company.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 pt-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                            onClick={() => setSelectedCompany(company)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          {selectedCompany && (
                            <>
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                                  {selectedCompany.name}
                                </DialogTitle>
                                <div className="flex items-center space-x-2 mb-4">
                                  <Badge className="bg-green-100 text-green-800">{selectedCompany.industry}</Badge>
                                  <Badge variant="outline" className="border-amber-200 text-amber-700">{selectedCompany.country}</Badge>
                                  <Badge className={selectedCompany.tier === 'Tier 1' ? 'bg-green-600 text-white' : selectedCompany.tier === 'Tier 2' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'}>
                                    {selectedCompany.tier}
                                  </Badge>
                                  <div className="flex items-center space-x-1">
                                    {[...Array(selectedCompany.rating)].map((_, i) => (
                                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                  </div>
                                </div>
                                <DialogDescription className="text-gray-600 text-base">
                                  {selectedCompany.description}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <Tabs defaultValue="overview" className="mt-6">
                                <TabsList className="grid w-full grid-cols-4">
                                  <TabsTrigger value="overview">Overview</TabsTrigger>
                                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                                  <TabsTrigger value="products">Products</TabsTrigger>
                                  <TabsTrigger value="business">Business</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="overview" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Company Details</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span className="text-gray-500">Founded:</span>
                                            <span>{selectedCompany.founded}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-500">Employees:</span>
                                            <span>{selectedCompany.employees}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-500">Funding:</span>
                                            <span>{selectedCompany.funding}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-3">
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                                        <div className="flex flex-wrap gap-1">
                                          {selectedCompany.specialties.map((specialty, index) => (
                                            <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700">
                                              {specialty}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      {selectedCompany.certifications && (
                                        <div>
                                          <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                                          <div className="flex flex-wrap gap-1">
                                            {selectedCompany.certifications.map((cert, index) => (
                                              <Badge key={index} variant="outline" className="text-xs border-amber-200 text-amber-700">
                                                {cert}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="analysis" className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Expert Analysis</h4>
                                    <p className="text-gray-700 leading-relaxed">{selectedCompany.analysis}</p>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="products" className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Key Products</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                      {selectedCompany.keyProducts.map((product, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                          <span className="text-gray-800 font-medium">{product}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="business" className="space-y-4">
                                  <div className="grid grid-cols-1 gap-4">
                                    <div>
                                      <h4 className="font-semibold text-gray-900 mb-2">Business Model</h4>
                                      <p className="text-gray-700">{selectedCompany.businessModel}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900 mb-2">Revenue Model</h4>
                                      <p className="text-gray-700">{selectedCompany.revenueModel}</p>
                                    </div>
                                    {selectedCompany.partnerships && (
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Key Partnerships</h4>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedCompany.partnerships.map((partnership, index) => (
                                            <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                                              {partnership}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </TabsContent>
                              </Tabs>
                              
                              <div className="flex items-center space-x-3 pt-6 border-t">
                                <Button asChild className="bg-green-600 hover:bg-green-700">
                                  <a href={selectedCompany.affiliateLink || selectedCompany.website} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Visit Website
                                  </a>
                                </Button>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button asChild variant="ghost" size="sm" className="text-green-700 hover:bg-green-50">
                        <a href={company.affiliateLink || company.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {/* Industries Section */}
      {activeSection === 'industries' && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Categories</h2>
              <p className="text-xl text-gray-600">Explore mushroom and mycelium applications across major industries</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.filter(industry => industry.id !== 'all').map((industry) => (
                <Card key={industry.id} className="hover:shadow-xl transition-all duration-300 border-green-100 hover:border-green-300 bg-white/80 backdrop-blur-sm cursor-pointer"
                      onClick={() => {setSelectedIndustry(industry.id); setActiveSection('companies');}}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-amber-600 rounded-lg flex items-center justify-center">
                        <industry.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">{industry.name}</CardTitle>
                        <p className="text-sm text-gray-600">{industry.count} companies</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {industry.id === 'food-beverage' && "Functional foods, alternative proteins, beverages, and nutritional supplements leveraging mushroom and mycelium technologies."}
                      {industry.id === 'materials' && "Sustainable packaging, leather alternatives, construction materials, and innovative mycelium-based products."}
                      {industry.id === 'health-wellness' && "Supplements, functional mushrooms, therapeutic applications, and wellness products for health optimization."}
                      {industry.id === 'biotechnology' && "Research, development, fermentation technologies, and breakthrough innovations in mycology applications."}
                      {industry.id === 'agriculture' && "Cultivation systems, spawn production, farming equipment, and agricultural technology solutions."}
                      {industry.id === 'cosmetics' && "Skincare, beauty products, personal care items, and cosmetic applications using mushroom extracts."}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Opportunities Section */}
      {activeSection === 'opportunities' && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Opportunities</h2>
              <p className="text-xl text-gray-600">Industry insights, integration strategies, and growth opportunities</p>
            </div>
            
            <Tabs defaultValue="insights" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="insights">Industry Insights</TabsTrigger>
                <TabsTrigger value="integration">Tech Integration</TabsTrigger>
                <TabsTrigger value="research">Research Papers</TabsTrigger>
                <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
              </TabsList>
              
              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span>Market Growth Trends</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">The global mushroom market is projected to reach $86.9 billion by 2030, with mycelium materials showing 25% annual growth.</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Alternative protein market: $290B opportunity</li>
                        <li>• Sustainable packaging: $440B market potential</li>
                        <li>• Functional foods: $279B growing sector</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-green-600" />
                        <span>Regional Opportunities</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">Emerging markets and regulatory changes creating new opportunities across regions.</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Europe: €1.2B sustainability initiatives</li>
                        <li>• Asia-Pacific: 40% market growth rate</li>
                        <li>• North America: $500M+ venture funding</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="integration" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle>Food Industry</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">Replace traditional proteins with mycelium-based alternatives. 70% lower environmental impact, complete amino acid profiles.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle>Fashion & Textiles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">Mycelium leather alternatives offer luxury feel with sustainable production. 90% less water usage than traditional leather.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle>Construction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">Mycelium insulation and building materials provide fire resistance and thermal efficiency with carbon-negative footprint.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="research" className="space-y-6">
                <div className="space-y-4">
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle>Latest Research Publications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold">Mycelium Materials: A Sustainable Alternative</h4>
                          <p className="text-sm text-gray-600">Nature Materials, 2024 - Comprehensive analysis of mycelium-based materials showing superior sustainability metrics.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold">Functional Mushrooms in Human Health</h4>
                          <p className="text-sm text-gray-600">Journal of Functional Foods, 2024 - Meta-analysis of 150+ studies on mushroom bioactive compounds.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold">Economic Impact of Mycelium Technologies</h4>
                          <p className="text-sm text-gray-600">Industrial Biotechnology, 2024 - Economic modeling showing $50B market potential by 2030.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="partnerships" className="space-y-6">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Partnership Opportunities</h3>
                  <p className="text-gray-600 mb-6">
                    We're currently developing strategic partnership opportunities in the mushroom and mycelium industry.
                  </p>
                  <p className="text-gray-600">
                    For partnership inquiries, please contact us at success@ednye.com
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* Company Suggestion Dialog */}
      <Dialog open={showSuggestionForm} onOpenChange={setShowSuggestionForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Suggest A Company</DialogTitle>
            <DialogDescription>
              Know a mushroom or mycelium company we should include? Help us build the most comprehensive industry database.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSuggestionSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Company Name *</label>
                <Input
                  required
                  value={suggestionForm.companyName}
                  onChange={(e) => setSuggestionForm({...suggestionForm, companyName: e.target.value})}
                  placeholder="Enter company name"
                  className="border-green-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Website</label>
                <Input
                  value={suggestionForm.website}
                  onChange={(e) => setSuggestionForm({...suggestionForm, website: e.target.value})}
                  placeholder="https://company.com"
                  className="border-green-200"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Industry</label>
              <Select value={suggestionForm.industry} onValueChange={(value) => setSuggestionForm({...suggestionForm, industry: value})}>
                <SelectTrigger className="border-green-200">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Materials & Packaging">Materials & Packaging</SelectItem>
                  <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                  <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                  <SelectItem value="Agriculture & Cultivation">Agriculture & Cultivation</SelectItem>
                  <SelectItem value="Cosmetics & Personal Care">Cosmetics & Personal Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
              <Textarea
                value={suggestionForm.description}
                onChange={(e) => setSuggestionForm({...suggestionForm, description: e.target.value})}
                placeholder="Brief description of the company and their mushroom/mycelium products or services"
                className="border-green-200"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Your Email</label>
              <Input
                type="email"
                value={suggestionForm.contactEmail}
                onChange={(e) => setSuggestionForm({...suggestionForm, contactEmail: e.target.value})}
                placeholder="your@email.com"
                className="border-green-200"
              />
            </div>
            <div className="flex items-center space-x-3 pt-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Mail className="w-4 h-4 mr-2" />
                Submit Suggestion
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowSuggestionForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-amber-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Mushrooms.ink</h3>
                  <p className="text-gray-400 text-sm">Global Industry Authority</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                The world's most comprehensive database of mushroom and mycelium companies. 
                Connecting the global fungi economy through expert analysis and industry insights.
              </p>
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => setShowSuggestionForm(true)}
                  variant="outline" 
                  size="sm"
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Suggest A Company
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Food & Beverage</a></li>
                <li><a href="#" className="hover:text-white">Materials & Packaging</a></li>
                <li><a href="#" className="hover:text-white">Health & Wellness</a></li>
                <li><a href="#" className="hover:text-white">Biotechnology</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Company Database</a></li>
                <li><a href="#" className="hover:text-white">Industry Analysis</a></li>
                <li><a href="#" className="hover:text-white">Research Papers</a></li>
                <li><a href="#" className="hover:text-white">Partnership Opportunities</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="text-center text-gray-400 space-y-3">
              <div className="text-sm">
                <p className="mb-2"><strong>Affiliate Disclosure:</strong> This website contains affiliate links. We may earn a commission when you click on or make purchases via these links, at no additional cost to you. This helps support our research and content creation.</p>
                <p><strong>Content Disclaimer:</strong> Company information, ratings, and analysis are compiled from publicly available sources and third-party reviews. These are not personal endorsements and should not be considered definitive investment or purchasing advice. Always conduct your own research before making business decisions.</p>
              </div>
              <p className="text-xs">&copy; 2025 Mushrooms.ink. The definitive global mushroom industry resource.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

