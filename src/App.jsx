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
const companiesData = [
  {
    id: 1,
    name: "Meati Foods",
    industry: "Food & Beverage",
    country: "USA",
    description: "Mycelium-based meat alternatives including steaks and chicken with Series C funding of $290M+.",
    founded: "2019",
    employees: "100-500",
    funding: "$290M+ Series C",
    specialties: ["Mycelium fermentation", "Alternative Protein", "Meat alternatives"],
    website: "https://meati.com",
    affiliateProgram: false,
    affiliateLink: "https://meati.com",
    tier: "Tier 1",
    rating: 5,
    keyProducts: ["Mycelium steaks", "Chicken alternatives"],
    certifications: ["Non-GMO"],
    analysis: "Market leader in mycelium-based meat alternatives with exceptional funding and retail partnerships including Whole Foods and Target.",
    businessModel: "B2C/Retail consumer food products",
    partnerships: ["Whole Foods", "Target"],
    revenueModel: "Product sales through retail channels"
  },
  {
    id: 2,
    name: "Nature's Fynd",
    industry: "Food & Beverage",
    country: "USA",
    description: "Fy Protein™ from volcanic microorganisms creating complete protein alternatives with NASA collaboration.",
    founded: "2012",
    employees: "100-500",
    funding: "$158M+ Series B",
    specialties: ["Fy protein technology", "Alternative Protein", "Fermentation"],
    website: "https://naturesfynd.com",
    affiliateProgram: false,
    affiliateLink: "https://naturesfynd.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Fy Protein Yogurt", "Cream Cheese", "Breakfast Patties"],
    certifications: ["FDA GRAS", "Health Canada Approved"],
    analysis: "Innovative volcanic microorganism technology with exceptional backing. FDA GRAS status with expanding retail presence.",
    businessModel: "Consumer food products + B2B protein ingredients",
    partnerships: ["NASA", "Major retailers"],
    revenueModel: "Product sales + ingredient licensing"
  },
  {
    id: 3,
    name: "MycoWorks",
    industry: "Materials & Packaging",
    country: "USA",
    description: "Revolutionary Fine Mycelium™ technology creating luxury materials for fashion and automotive industries.",
    founded: "2013",
    employees: "100-500",
    funding: "$125M Series C",
    specialties: ["Fine Mycelium technology", "Luxury Materials", "Sustainable Manufacturing"],
    website: "https://mycoworks.com",
    affiliateProgram: false,
    affiliateLink: "https://mycoworks.com",
    tier: "Tier 1",
    rating: 5,
    keyProducts: ["Fine Mycelium Materials", "Luxury Leather Alternatives"],
    certifications: ["40+ Patents", "Commercial-scale Facility"],
    analysis: "Industry-leading technology with verified luxury brand partnerships. Hermès collaboration producing premium products.",
    businessModel: "B2B materials supplier to luxury and automotive brands",
    partnerships: ["Hermès", "luxury brands"],
    revenueModel: "Materials licensing + manufacturing partnerships"
  },
  {
    id: 4,
    name: "Ecovative",
    industry: "Materials & Packaging",
    country: "USA",
    description: "Pioneer in mycelium materials with 16+ years experience, $60M+ funding, and 40+ patents.",
    founded: "2007",
    employees: "100-500",
    funding: "$60M+ Series B",
    specialties: ["Mycelium Packaging", "Sustainable Materials", "Mushroom Technology"],
    website: "https://ecovative.com",
    affiliateProgram: false,
    affiliateLink: "https://ecovative.com",
    tier: "Tier 1",
    rating: 5,
    keyProducts: ["Mushroom Packaging", "MycoFlex", "AirMycelium"],
    certifications: ["40+ Patents", "Government Contracts"],
    analysis: "Industry pioneer with proven technology and strong government backing. Partnerships with Fortune 500 companies demonstrate commercial viability.",
    businessModel: "B2B materials and packaging solutions + licensing",
    partnerships: ["Fortune 500 companies"],
    revenueModel: "Materials sales + licensing + government contracts"
  },
  {
    id: 5,
    name: "Bolt Threads",
    industry: "Materials & Packaging",
    country: "USA",
    description: "Mycelium leather and sustainable materials for fashion industry with $123M Series C funding.",
    founded: "2009",
    employees: "100-500",
    funding: "$123M Series C",
    specialties: ["Mycelium materials", "Sustainable fashion", "Biomaterials"],
    website: "https://boltthreads.com",
    affiliateProgram: false,
    affiliateLink: "https://boltthreads.com",
    tier: "Tier 1",
    rating: 5,
    keyProducts: ["Mycelium leather", "Sustainable materials"],
    certifications: ["Sustainable"],
    analysis: "Fashion industry leader in mycelium materials with partnerships with major brands including Adidas and Stella McCartney.",
    businessModel: "B2B sustainable materials for fashion",
    partnerships: ["Adidas", "Stella McCartney"],
    revenueModel: "Materials sales + licensing partnerships"
  },
  {
    id: 6,
    name: "Four Sigmatic",
    industry: "Health & Wellness",
    country: "USA",
    description: "Functional mushroom coffee and beverages with global distribution and strong brand recognition.",
    founded: "2012",
    employees: "50-100",
    funding: "$20M+ Series A",
    specialties: ["Functional Coffee", "Mushroom Beverages", "Consumer Brand"],
    website: "https://foursigmatic.com",
    affiliateProgram: true,
    affiliateRate: "10%+",
    affiliateLink: "https://foursigmatic.com",
    tier: "Tier 2",
    rating: 3,
    keyProducts: ["Mushroom Coffee", "Supplements", "Functional foods"],
    certifications: ["Organic"],
    analysis: "Strong brand recognition in functional mushroom beverages with retail partnerships including Whole Foods and Target.",
    businessModel: "Direct-to-consumer functional beverages + retail distribution",
    partnerships: ["Whole Foods", "Target"],
    revenueModel: "Product sales + subscription revenue"
  },
  {
    id: 7,
    name: "Host Defense",
    industry: "Health & Wellness",
    country: "USA",
    description: "Mushroom supplements and immune support products with $50M+ in private funding.",
    founded: "1999",
    employees: "100-500",
    funding: "$50M+ Private",
    specialties: ["Mushroom extracts", "Immune support", "Supplements"],
    website: "https://hostdefense.com",
    affiliateProgram: false,
    affiliateLink: "https://hostdefense.com",
    tier: "Tier 2",
    rating: 4,
    keyProducts: ["Mushroom supplements", "Immune support products"],
    certifications: ["Organic"],
    analysis: "Established leader in mushroom supplements with strong retail presence and focus on immune support products.",
    businessModel: "B2C/Retail supplements and health products",
    partnerships: ["Major retailers"],
    revenueModel: "Product sales through retail and direct channels"
  },
  {
    id: 8,
    name: "Real Mushrooms",
    industry: "Health & Wellness",
    country: "Canada",
    description: "Premium mushroom supplements with verified beta-glucan content and quality testing.",
    founded: "2015",
    employees: "10-50",
    funding: "$10M+ Private",
    specialties: ["Organic Supplements", "Third-party Testing", "Beta-glucan Verification"],
    website: "https://realmushrooms.com",
    affiliateProgram: true,
    affiliateRate: "20%",
    affiliateLink: "https://realmushrooms.com",
    tier: "Tier 1",
    rating: 5,
    keyProducts: ["Lion's Mane", "Reishi", "Cordyceps", "Turkey Tail"],
    certifications: ["Organic", "Quality tested"],
    analysis: "Quality leader in mushroom supplements with verified claims and excellent customer satisfaction ratings.",
    businessModel: "Direct-to-consumer supplements with wholesale distribution",
    partnerships: ["Health retailers"],
    revenueModel: "Product sales + affiliate partnerships"
  },
  {
    id: 9,
    name: "Phillips Mushroom Farms",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Specialty mushrooms and commercial cultivation with nearly 100 years of experience.",
    founded: "1927",
    employees: "100-500",
    funding: "$50M+ Private",
    specialties: ["Mushroom cultivation", "Commercial farming", "Specialty mushrooms"],
    website: "https://phillipsmushroomfarms.com",
    affiliateProgram: false,
    affiliateLink: "https://phillipsmushroomfarms.com",
    tier: "Tier 1",
    rating: 5,
    keyProducts: ["Specialty mushrooms", "Commercial cultivation"],
    certifications: ["Premium"],
    analysis: "Industry pioneer with nearly a century of experience in commercial mushroom cultivation and distribution.",
    businessModel: "B2B commercial farming and distribution",
    partnerships: ["Food distributors"],
    revenueModel: "Product sales through distribution networks"
  },
  {
    id: 10,
    name: "Monterey Mushrooms",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Fresh mushrooms and organic mushroom distribution with $100M+ revenue.",
    founded: "1971",
    employees: "500+",
    funding: "$100M+ Private",
    specialties: ["Vertical integration", "Organic mushrooms", "Distribution"],
    website: "https://montereymushrooms.com",
    affiliateProgram: false,
    affiliateLink: "https://montereymushrooms.com",
    tier: "Tier 1",
    rating: 5,
    keyProducts: ["Fresh mushrooms", "Organic mushrooms"],
    certifications: ["Organic certified"],
    analysis: "Market leader in fresh mushroom production and distribution with strong retail partnerships.",
    businessModel: "B2B commercial farming and retail distribution",
    partnerships: ["Major retailers"],
    revenueModel: "Product sales through retail and foodservice"
  },
  {
    id: 11,
    name: "Hexagon Bio",
    industry: "Biotechnology",
    country: "USA",
    description: "AI-driven drug discovery using mushroom compounds with $20M Series A funding.",
    founded: "2018",
    employees: "50-100",
    funding: "$20M Series A",
    specialties: ["AI drug discovery", "Mushroom compounds", "Pharmaceuticals"],
    website: "https://hexagonbio.com",
    affiliateProgram: false,
    affiliateLink: "https://hexagonbio.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["AI drug discovery platform", "Mushroom-based compounds"],
    certifications: ["Proprietary"],
    analysis: "Technology platform company using AI to discover pharmaceutical compounds from mushrooms with partnerships with big pharma.",
    businessModel: "B2B drug discovery platform",
    partnerships: ["Big pharma"],
    revenueModel: "Platform licensing + research partnerships"
  },
  {
    id: 12,
    name: "Chinova Bioworks",
    industry: "Biotechnology",
    country: "Canada",
    description: "Natural preservatives from mushrooms for food safety with $6M Series A funding.",
    founded: "2016",
    employees: "10-50",
    funding: "$6M Series A",
    specialties: ["Mushroom extraction", "Food preservation", "Natural preservatives"],
    website: "https://chinovabioworks.com",
    affiliateProgram: false,
    affiliateLink: "https://chinovabioworks.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Natural preservatives", "Food safety solutions"],
    certifications: ["Natural"],
    analysis: "Food technology company developing natural preservatives from mushrooms with partnerships in the food industry.",
    businessModel: "B2B food industry partnerships",
    partnerships: ["Food companies"],
    revenueModel: "Ingredient sales + licensing"
  },
  {
    id: 13,
    name: "Shikohin",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Japanese mushroom skincare with premium products and $2M seed funding.",
    founded: "2020",
    employees: "10-50",
    funding: "$2M Seed",
    specialties: ["Mushroom extracts", "Premium skincare", "Japanese formulations"],
    website: "https://shikohin.com",
    affiliateProgram: false,
    affiliateLink: "https://shikohin.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Japanese mushroom skincare", "Premium products"],
    certifications: ["Natural/Vegan"],
    analysis: "Premium Japanese-inspired mushroom skincare brand targeting high-end beauty consumers.",
    businessModel: "B2C premium skincare products",
    partnerships: ["Beauty retailers"],
    revenueModel: "Product sales through retail and direct channels"
  },
  {
    id: 14,
    name: "Origins",
    industry: "Cosmetics & Personal Care",
    country: "USA",
    description: "Dr. Weil Mega-Mushroom line and mainstream beauty products with $1B+ revenue.",
    founded: "1990",
    employees: "1000+",
    funding: "$1B+ Public",
    specialties: ["Mushroom formulations", "Mainstream beauty", "Dermatologist-tested"],
    website: "https://origins.com",
    affiliateProgram: false,
    affiliateLink: "https://origins.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Dr. Weil Mega-Mushroom line", "Skincare"],
    certifications: ["Dermatologist-tested"],
    analysis: "Mainstream beauty leader with established mushroom skincare line and global retail presence.",
    businessModel: "B2C mainstream beauty products",
    partnerships: ["Major retailers"],
    revenueModel: "Product sales through global retail network"
  },
  {
    id: 15,
    name: "Smallhold",
    industry: "Food & Beverage",
    country: "USA",
    description: "Organic mushroom farms network with fresh mushrooms and $25M Series A funding.",
    founded: "2017",
    employees: "50-100",
    funding: "$25M Series A",
    specialties: ["Urban farming", "Organic mushrooms", "Fresh mushrooms"],
    website: "https://smallhold.com",
    affiliateProgram: false,
    affiliateLink: "https://smallhold.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Organic mushrooms", "Fresh mushrooms"],
    certifications: ["Organic certified"],
    analysis: "Network model for urban mushroom farming with partnerships including Sprouts Farmers Market.",
    businessModel: "B2B/B2C urban farming network",
    partnerships: ["Sprouts Farmers Market"],
    revenueModel: "Product sales + franchise partnerships"
  },
  {
    id: 16,
    name: "The Better Meat Co.",
    industry: "Food & Beverage",
    country: "USA",
    description: "Rhiza mycelium protein and B2B ingredients with $8.1M Series A funding.",
    founded: "2018",
    employees: "10-50",
    funding: "$8.1M Series A",
    specialties: ["Rhiza mycelium", "B2B ingredients", "Alternative protein"],
    website: "https://bettermeat.co",
    affiliateProgram: false,
    affiliateLink: "https://bettermeat.co",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Rhiza mycelium protein", "B2B ingredients"],
    certifications: ["Clean label"],
    analysis: "B2B specialist in mycelium protein ingredients with partnerships with CPG companies.",
    businessModel: "B2B ingredients supplier",
    partnerships: ["CPG companies"],
    revenueModel: "Ingredient sales + licensing"
  },
  {
    id: 17,
    name: "Atlast Food Co.",
    industry: "Food & Beverage",
    country: "USA",
    description: "Mycelium-based whole cuts and steaks with $40M Series A funding.",
    founded: "2019",
    employees: "50-100",
    funding: "$40M Series A",
    specialties: ["Mycelium whole cuts", "Alternative protein", "Steaks"],
    website: "https://atlastfood.co",
    affiliateProgram: false,
    affiliateLink: "https://atlastfood.co",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Mycelium-based whole cuts", "Steaks"],
    certifications: ["Sustainable"],
    analysis: "Technology leader in mycelium whole cuts as Ecovative spinout with restaurant and retail partnerships.",
    businessModel: "B2B/B2C alternative protein products",
    partnerships: ["Restaurants/Retail"],
    revenueModel: "Product sales through foodservice and retail"
  },
  {
    id: 18,
    name: "Mushroom Revival",
    industry: "Health & Wellness",
    country: "USA",
    description: "Mushroom supplements, tinctures, and powders with $5M+ private funding.",
    founded: "2018",
    employees: "10-50",
    funding: "$5M+ Private",
    specialties: ["Mushroom processing", "Supplements", "Tinctures"],
    website: "https://mushroomrevival.com",
    affiliateProgram: true,
    affiliateRate: "15%",
    affiliateLink: "https://mushroomrevival.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Mushroom supplements", "Tinctures", "Powders"],
    certifications: ["Organic"],
    analysis: "Direct-to-consumer wellness brand with strong online presence and affiliate partnerships.",
    businessModel: "B2C/Retail supplements and wellness products",
    partnerships: ["Online retailers"],
    revenueModel: "Product sales + affiliate partnerships"
  },
  {
    id: 19,
    name: "FreshCap Mushrooms",
    industry: "Health & Wellness",
    country: "Canada",
    description: "Mushroom supplements and educational content with $2M+ private funding.",
    founded: "2017",
    employees: "10-50",
    funding: "$2M+ Private",
    specialties: ["Mushroom extracts", "Educational content", "Quality testing"],
    website: "https://freshcap.com",
    affiliateProgram: true,
    affiliateRate: "10-20%",
    affiliateLink: "https://freshcap.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Mushroom supplements", "Educational content"],
    certifications: ["Quality tested"],
    analysis: "Education-focused mushroom supplement company with strong content marketing and influencer partnerships.",
    businessModel: "B2C/Retail supplements with educational focus",
    partnerships: ["Health influencers"],
    revenueModel: "Product sales + educational partnerships"
  },
  {
    id: 20,
    name: "Om Mushroom Superfood",
    industry: "Health & Wellness",
    country: "USA",
    description: "Mushroom powders, supplements, and functional foods with $20M+ private funding.",
    founded: "2010",
    employees: "50-100",
    funding: "$20M+ Private",
    specialties: ["Mushroom cultivation", "Superfood products", "Functional foods"],
    website: "https://ommushrooms.com",
    affiliateProgram: true,
    affiliateRate: "10%",
    affiliateLink: "https://ommushrooms.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Mushroom powders", "Supplements", "Functional foods"],
    certifications: ["Organic"],
    analysis: "Superfood leader in mushroom products with strong retail presence including Whole Foods and Amazon.",
    businessModel: "B2C/Retail superfood and wellness products",
    partnerships: ["Whole Foods", "Amazon"],
    revenueModel: "Product sales through retail channels"
  },
  {
    id: 21,
    name: "North Spore",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Mushroom growing supplies, spawn, and equipment with $5M+ private funding.",
    founded: "2014",
    employees: "10-50",
    funding: "$5M+ Private",
    specialties: ["Cultivation technology", "Growing supplies", "Spawn production"],
    website: "https://northspore.com",
    affiliateProgram: false,
    affiliateLink: "https://northspore.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Mushroom growing supplies", "Spawn", "Equipment"],
    certifications: ["Quality standards"],
    analysis: "Supply leader for mushroom cultivation with partnerships with commercial growers globally.",
    businessModel: "B2B/B2C cultivation supplies and equipment",
    partnerships: ["Commercial growers"],
    revenueModel: "Product sales + equipment leasing"
  },
  {
    id: 22,
    name: "Fungi Perfecti",
    industry: "Agriculture & Cultivation",
    country: "USA",
    description: "Mushroom spawn, research, and education with $10M+ private funding.",
    founded: "1980",
    employees: "50-100",
    funding: "$10M+ Private",
    specialties: ["Mycology research", "Spawn production", "Education"],
    website: "https://fungi.com",
    affiliateProgram: true,
    affiliateRate: "5%",
    affiliateLink: "https://fungi.com",
    tier: "Tier 1",
    rating: 5,
    keyProducts: ["Mushroom spawn", "Research", "Education"],
    certifications: ["Organic"],
    analysis: "Research leader in mycology with educational partnerships and strong reputation in the industry.",
    businessModel: "B2B/B2C research, education, and supplies",
    partnerships: ["Research institutions"],
    revenueModel: "Product sales + research partnerships + education"
  },
  {
    id: 23,
    name: "Grown Bio",
    industry: "Materials & Packaging",
    country: "USA",
    description: "Mycelium materials and sustainable alternatives with $10M seed funding.",
    founded: "2020",
    employees: "10-50",
    funding: "$10M Seed",
    specialties: ["Mycelium cultivation", "Sustainable materials", "Biomaterials"],
    website: "https://grown.bio",
    affiliateProgram: false,
    affiliateLink: "https://grown.bio",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Mycelium materials", "Sustainable alternatives"],
    certifications: ["Sustainable"],
    analysis: "Emerging leader in mycelium materials with strong funding and partnerships with material suppliers.",
    businessModel: "B2B sustainable materials supplier",
    partnerships: ["Material suppliers"],
    revenueModel: "Materials sales + licensing partnerships"
  },
  {
    id: 24,
    name: "Alice Mushrooms",
    industry: "Health & Wellness",
    country: "USA",
    description: "Functional mushroom chocolates and nootropics with $2.5M seed funding.",
    founded: "2020",
    employees: "10-50",
    funding: "$2.5M Seed",
    specialties: ["Functional mushrooms", "Nootropics", "Premium products"],
    website: "https://alicemushrooms.com",
    affiliateProgram: true,
    affiliateRate: "15%",
    affiliateLink: "https://alicemushrooms.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Functional mushroom chocolates", "Nootropics"],
    certifications: ["Premium"],
    analysis: "Premium positioning in functional mushroom products with focus on wellness consumers and specialty retailers.",
    businessModel: "B2C premium wellness products",
    partnerships: ["Specialty retailers"],
    revenueModel: "Product sales + premium positioning"
  },
  {
    id: 25,
    name: "MUD/WTR",
    industry: "Health & Wellness",
    country: "USA",
    description: "Mushroom coffee alternatives and wellness drinks with $17M Series A funding.",
    founded: "2018",
    employees: "50-100",
    funding: "$17M Series A",
    specialties: ["Mushroom blends", "Coffee alternatives", "Wellness drinks"],
    website: "https://mudwtr.com",
    affiliateProgram: false,
    affiliateLink: "https://mudwtr.com",
    tier: "Tier 1",
    rating: 4,
    keyProducts: ["Mushroom coffee alternatives", "Wellness drinks"],
    certifications: ["Organic"],
    analysis: "Coffee alternative leader with strong brand recognition and retail partnerships in the health sector.",
    businessModel: "B2C coffee alternatives and wellness beverages",
    partnerships: ["Health retailers"],
    revenueModel: "Product sales + subscription model"
  }
];

const industries = [
  { id: 'all', name: 'All Industries', icon: Globe, count: 25 },
  { id: 'food-beverage', name: 'Food & Beverage', icon: Leaf, count: 8 },
  { id: 'materials', name: 'Materials & Packaging', icon: Building2, count: 5 },
  { id: 'health-wellness', name: 'Health & Wellness', icon: Heart, count: 8 },
  { id: 'biotechnology', name: 'Biotechnology', icon: Microscope, count: 2 },
  { id: 'agriculture', name: 'Agriculture & Cultivation', icon: Sprout, count: 4 },
  { id: 'cosmetics', name: 'Cosmetics & Personal Care', icon: Sparkles, count: 2 }
];

const stats = [
  { label: 'Companies Analyzed', value: '25+', icon: Building2 },
  { label: 'Countries Covered', value: '3', icon: Globe },
  { label: 'Industries Tracked', value: '6', icon: TrendingUp },
  { label: 'Expert Reviews', value: '25+', icon: Award }
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
                            (selectedIndustry === 'cosmetics' && company.industry === 'Cosmetics & Personal Care');
      
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
            Discover 25+ companies across food, materials, health, biotechnology, agriculture, and cosmetics. 
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

