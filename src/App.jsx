import { useState, useMemo } from 'react'
import { Search, Filter, ExternalLink, Users, TrendingUp, Globe, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { companies, industryStats, totalCompanies } from './data/companies.js'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [sortBy, setSortBy] = useState('name')

  const industries = ['All', ...Object.keys(industryStats)]

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.products.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesIndustry = selectedIndustry === 'All' || company.industry === selectedIndustry
      
      return matchesSearch && matchesIndustry
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'founded':
          return b.founded - a.founded
        case 'funding':
          // Simple funding sort - companies with more recent funding rounds first
          const fundingOrder = { 'Series C': 4, 'Series B': 3, 'Series A': 2, 'Seed': 1, 'Private': 0, 'Public': 5 }
          const aFunding = fundingOrder[a.funding?.split(',')[0]] || 0
          const bFunding = fundingOrder[b.funding?.split(',')[0]] || 0
          return bFunding - aFunding
        case 'innovation':
          const innovationOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }
          return innovationOrder[b.innovation] - innovationOrder[a.innovation]
        default:
          return 0
      }
    })
  }, [searchTerm, selectedIndustry, sortBy])

  const stats = [
    { label: 'Companies Analyzed', value: totalCompanies, icon: Building2 },
    { label: 'Industries Tracked', value: Object.keys(industryStats).length, icon: TrendingUp },
    { label: 'Countries Represented', value: '8', icon: Globe },
    { label: 'Total Employees', value: '5,000+', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mushrooms.ink</h1>
              <p className="text-lg text-gray-600 mt-1">Comprehensive Mushroom & Mycelium Company Database</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">Discover the future of sustainable innovation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <div className="flex items-center">
                <stat.icon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search companies, products, or technologies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry === 'All' ? 'All Industries' : `${industry} (${industryStats[industry] || 0})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="founded">Founded Year</option>
                <option value="funding">Funding Stage</option>
                <option value="innovation">Innovation Level</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAndSortedCompanies.length} of {totalCompanies} companies
            {selectedIndustry !== 'All' && ` in ${selectedIndustry}`}
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCompanies.map((company) => (
            <div key={company.id} className="bg-white rounded-lg shadow-sm border border-green-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{company.name}</h3>
                  <p className="text-sm text-gray-600">{company.country} • {company.industry}</p>
                </div>
                {company.website && (
                  <a
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Products & Services</h4>
                  <p className="text-sm text-gray-600">{company.products}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">About</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">{company.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {company.stage}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {company.businessModel}
                  </span>
                  {company.affiliate && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Affiliate Available
                    </span>
                  )}
                  {company.franchise && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Franchise Available
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span>Founded: {company.founded}</span>
                  <span>Employees: {company.employees}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No companies found matching your criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Mushrooms.ink</h3>
              <p className="text-gray-600 text-sm">
                Your comprehensive resource for discovering innovative companies in the mushroom and mycelium industry. 
                From alternative proteins to sustainable materials, explore the future of fungi-based innovation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Industries</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {Object.entries(industryStats).map(([industry, count]) => (
                  <li key={industry}>
                    <button
                      onClick={() => setSelectedIndustry(industry)}
                      className="hover:text-green-600 transition-colors"
                    >
                      {industry} ({count})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600 transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Industry Reports</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Partnership Opportunities</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Mushrooms.ink. Comprehensive database of mushroom and mycelium companies worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

