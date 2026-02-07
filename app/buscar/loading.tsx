// app/buscar/loading.tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrendingUp, Award, MapPin } from "lucide-react";

export default function BuscarPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20 lg:pb-0">
        {/* Hero Section Skeleton - Profesional */}
        <section className="bg-white border-b border-gray-200/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Header skeleton */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200/60 rounded-full mb-4">
                  <TrendingUp className="h-4 w-4 text-primary-700 animate-pulse" strokeWidth={2.5} />
                  <div className="h-4 bg-primary-100 rounded w-32 animate-pulse" />
                </div>

                <div className="h-12 bg-gray-100 rounded-lg w-80 mx-auto mb-4 animate-pulse" />
                <div className="h-6 bg-gray-100 rounded-lg w-64 mx-auto animate-pulse" />
              </div>

              {/* Search bar skeleton */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 h-[52px] bg-white border border-gray-300 rounded-xl animate-pulse shadow-sm" />
                  <div className="lg:hidden h-[52px] w-full sm:w-32 bg-white border-2 border-gray-300 rounded-xl animate-pulse" />
                </div>
              </div>

              {/* Stats skeleton */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {[Award, MapPin, TrendingUp].map((Icon, i) => (
                  <div 
                    key={i}
                    className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200/60"
                  >
                    <Icon className="h-5 w-5 text-gray-300 mx-auto mb-2 animate-pulse" strokeWidth={2.5} />
                    <div className="h-4 bg-gray-200 rounded w-12 mx-auto mb-1 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-16 mx-auto animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content Skeleton */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {/* Controls skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="h-10 bg-white border border-gray-200 rounded-xl w-48 animate-pulse shadow-sm" />
            <div className="flex items-center gap-4">
              <div className="h-12 bg-white border border-gray-200 rounded-xl w-40 animate-pulse shadow-sm" />
              <div className="hidden sm:block h-12 bg-white border border-gray-200 rounded-xl w-24 animate-pulse shadow-sm" />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar Skeleton */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl border border-gray-200/60 p-6 space-y-6 sticky top-24 shadow-sm">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
                    <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Results Skeleton */}
            <div className="lg:col-span-3">
              <div className="grid gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Avatar skeleton */}
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex-shrink-0 animate-pulse" />
                      
                      {/* Content skeleton */}
                      <div className="flex-1 space-y-3">
                        <div className="space-y-2">
                          <div className="h-6 bg-gray-100 rounded w-2/3 animate-pulse" />
                          <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse" />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {[...Array(3)].map((_, j) => (
                            <div 
                              key={j}
                              className="h-7 bg-gray-100 rounded-lg w-20 animate-pulse" 
                            />
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
                          <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
                        </div>
                      </div>

                      {/* Actions skeleton */}
                      <div className="flex sm:flex-col gap-2 sm:gap-3 sm:w-32">
                        <div className="flex-1 sm:flex-none h-11 bg-gray-100 rounded-xl animate-pulse" />
                        <div className="flex-1 sm:flex-none h-11 bg-gray-100 rounded-xl animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}