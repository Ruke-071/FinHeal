import Image from "next/image";
import Ruke from "../components/Ruke";
import {featuresData, howItWorksData, statsData, testimonialsData} from "@/data/landing";
import {EvervaultCard} from "../components/ui/evervault-card";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Ruke/>
      <section>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
            {statsData.map((statsData,stat) => (
              <div key={stat} className="m-4 text-center">
                <div className="text-4xl font-bold mb-2 text-blue-200">{statsData.value}</div>
                <div className="text-green-200 ">{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20"><div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Everything you need to manage your finances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="p-4 border-b border-gray-200">
              <EvervaultCard>
                <Card>
                  <CardContent className="space-y-5 pt-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
              </EvervaultCard>
            </div>
          ))}  
        </div>
      </div>

      </section>
      <section className="py-4"><div className="container mx-auto px-4 bg-[#262745] >">
        <h2 className="text-3xl font-bold mb-10 text-center pt-10">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {howItWorksData.map((step, index) => (
            <div key={index} className="p-4 border-b border-gray-200 text-center">
              <div className="w-16 h-16 bg-[#b5d2e4] rounded-full flex items-center justify-center mx-auto mb-6">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3> 
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}  
        </div>
      </div>
 
      </section>
       <section className="py-20"><div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Everything you need to manage your finances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="p-4 border-b border-gray-200">
              <EvervaultCard>
                <Card>
                  <CardContent className="pt-6 space-y-4">

                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={55}
                      height={55}
                      className="rounded-full"
                    />
                
                    <div>
                      <div className="text-lg font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-green-200">{testimonial.role}</div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                          
                </CardContent>

              </Card>
              </EvervaultCard>
            </div>
          ))}  
        </div>
      </div>

      </section>
      <section className="w-full bg-[#0A2F3A] ">
        <div className="container mx-auto px-4 py-4  text-center >">
        <h2 className="text-3xl font-bold mb-6 text-center pt-10">Ready To Take Control Of your finances?</h2>
        <p className="mb-8 max-w-2xl mx-auto">Join thousands of users who are already managing their Finances smarter with FinHeal</p>
         <Link href="/dashboard">
         <Button size ="lg" className = "bg-white text-blue-600 hover:bg-blue-950 hover:text-green-400 animate-bounce"> Start Free Trial</Button></Link>
      </div>
      </section>

    </div>
  );
}
