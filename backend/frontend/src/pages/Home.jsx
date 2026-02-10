import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts';
import { issuesAPI } from '../services/api';
import { 
  ExclamationTriangleIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  BuildingOfficeIcon,
  UsersIcon,
  TruckIcon,
  AcademicCapIcon,
  HeartIcon,
  SparklesIcon,
  NewspaperIcon,
  XMarkIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import mirissaImage from '../mirissa.webp';

const Home = () => {
  const { t } = useLanguage();
  const [topIssues, setTopIssues] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(true);

  // Fetch top 3 public issues
  useEffect(() => {
    const fetchTopIssues = async () => {
      try {
        const response = await issuesAPI.getIssues({ limit: 3, ordering: '-created_at' });
        const issues = response.data.results || response.data || [];
        setTopIssues(issues.slice(0, 3));
      } catch (error) {
        console.error('Error fetching public issues:', error);
      } finally {
        setLoadingIssues(false);
      }
    };
    fetchTopIssues();
  }, []);

  const features = [
    {
      icon: ExclamationTriangleIcon,
      title: t('reportAnIssue'),
      description: t('quicklyReportIssues'),
      color: 'blue'
    },
    {
      icon: ClipboardDocumentListIcon,
      title: t('trackProgress'),
      description: t('monitorIssueProgress'),
      color: 'green'
    },
    {
      icon: UserGroupIcon,
      title: t('transparentGovernance'),
      description: t('transparentProcessDescription'),
      color: 'purple'
    },
    {
      icon: ShieldCheckIcon,
      title: t('accountabilityThroughTechnology'),
      description: t('ensureAccountability'),
      color: 'red'
    }
  ];

  const categories = [
    { icon: BuildingOfficeIcon, name: t('infrastructure'), color: 'blue' },
    { icon: MegaphoneIcon, name: t('utilities'), color: 'green' },
    { icon: TruckIcon, name: t('transportation'), color: 'yellow' },
    { icon: HeartIcon, name: t('healthcare'), color: 'red' },
    { icon: AcademicCapIcon, name: t('education'), color: 'purple' },
    { icon: GlobeAltIcon, name: t('environment'), color: 'emerald' },
    { icon: ShieldCheckIcon, name: t('publicSafety'), color: 'orange' },
    { icon: SparklesIcon, name: t('other'), color: 'gray' }
  ];

  const steps = [
    {
      number: '01',
      title: t('reportIssue'),
      description: t('reportIssueDescription'),
      icon: DocumentTextIcon
    },
    {
      number: '02',
      title: t('automaticRouting'),
      description: t('automaticRoutingDescription'),
      icon: ArrowRightIcon
    },
    {
      number: '03',
      title: t('officialResponse'),
      description: t('officialResponseDescription'),
      icon: UsersIcon
    },
    {
      number: '04',
      title: t('resolution'),
      description: t('resolutionDescription'),
      icon: CheckCircleIcon
    }
  ];

  const stats = [
    { number: '1,250+', label: t('issuesResolved') },
    { number: '98%', label: t('satisfactionRate') },
    { number: '24/7', label: t('systemAvailability') },
    { number: '15', label: t('governmentLevels') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#001F54] via-blue-900 to-[#001F54]">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-300 text-sm font-medium">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Sri Lanka's Premier Civic Platform
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Civic<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Resolve</span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-lg leading-relaxed">
                Transform Sri Lanka together. Report issues, track progress, and build a better nation through transparent governance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/submit-issue"
                  className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-500/25 flex items-center justify-center"
                >
                  Report Issue
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/public-issues"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-[#001F54] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  View Public Issues
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-blue-200">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-sm">Government Verified</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-sm">Secure & Private</span>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Image */}
            <div className="relative">
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] mx-auto">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-80 animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-60 animate-pulse"></div>

                {/* Main circular image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white/20 shadow-2xl">
                  <img
                    src={mirissaImage}
                    alt="Sri Lanka"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating stats */}
                <div className="absolute -right-8 top-1/4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="text-2xl font-bold text-[#001F54]">1,250+</div>
                  <div className="text-sm text-gray-600">Issues Resolved</div>
                </div>

                <div className="absolute -left-8 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#ffffff"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#ffffff"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#001F54]">CivicResolve</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A modern platform designed for efficient, transparent civic engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const colorMap = {
                blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
                green: 'bg-gradient-to-br from-green-400 to-green-600',
                purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
                red: 'bg-gradient-to-br from-red-400 to-red-600'
              };
              return (
                <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 ${colorMap[feature.color]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Latest Public Issues Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest <span className="text-orange-500">Public Issues</span>
            </h2>
            <p className="text-xl text-gray-600">See what's happening in your community</p>
          </div>

          {loadingIssues ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#001F54]"></div>
            </div>
          ) : topIssues.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No public issues found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topIssues.map((issue) => (
                <Link
                  key={issue.id}
                  to={`/public-issues/${issue.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {issue.attachments && issue.attachments.length > 0 ? (
                      <img
                        src={`http://127.0.0.1:8000${issue.attachments[0].file}`}
                        alt={issue.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.src = mirissaImage; }}
                      />
                    ) : (
                      <img
                        src={mirissaImage}
                        alt={issue.title}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        issue.status === 'open' ? 'bg-green-500' :
                        issue.status === 'in_progress' ? 'bg-yellow-500' :
                        issue.status === 'resolved' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}>
                        {issue.status?.replace('_', ' ').toUpperCase() || 'OPEN'}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#001F54] transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {issue.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-medium text-sm">
                        {issue.grama_niladhari_division || issue.ds_division || issue.district || 'Location'}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {issue.category || 'General Issue'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/public-issues"
              className="inline-flex items-center bg-[#001F54] hover:bg-blue-900 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              View All Issues
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Issue <span className="text-[#001F54]">Categories</span>
            </h2>
            <p className="text-xl text-gray-600">Find issues by category</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {categories.map((category, index) => {
              const colorMap = {
                blue: { bg: 'bg-gradient-to-br from-blue-400 to-blue-600', border: 'hover:border-blue-200' },
                green: { bg: 'bg-gradient-to-br from-green-400 to-green-600', border: 'hover:border-green-200' },
                yellow: { bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600', border: 'hover:border-yellow-200' },
                red: { bg: 'bg-gradient-to-br from-red-400 to-red-600', border: 'hover:border-red-200' },
                purple: { bg: 'bg-gradient-to-br from-purple-400 to-purple-600', border: 'hover:border-purple-200' },
                emerald: { bg: 'bg-gradient-to-br from-emerald-400 to-emerald-600', border: 'hover:border-emerald-200' },
                orange: { bg: 'bg-gradient-to-br from-orange-400 to-orange-600', border: 'hover:border-orange-200' },
                gray: { bg: 'bg-gradient-to-br from-gray-400 to-gray-600', border: 'hover:border-gray-200' }
              };
              const colors = colorMap[category.color] || colorMap.blue;
              return (
                <Link
                  key={index}
                  to={`/public-issues?category=${category.name.toLowerCase()}`}
                  className={`group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent ${colors.border}`}
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#001F54] transition-colors">{category.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-24 bg-gradient-to-r from-[#001F54] via-blue-900 to-[#001F54] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-orange-400 rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-blue-400 rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a <span className="text-orange-400">Difference</span>?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Sri Lankans who are actively participating in building a better nation through CivicResolve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-500/25"
            >
              Get Started Today
            </Link>
            <Link
              to="/login"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-[#001F54] px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

