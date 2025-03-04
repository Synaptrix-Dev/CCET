import React, { useState, useEffect } from "react";

export default function ArabicWebsite() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D",
      title: "تمكين التعليم",
      description: "رحلة مبتكرة نحو مستقبل مشرق للتعلم",
      buttonText: "اكتشف المزيد",
    },
    {
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Nob29sfGVufDB8fDB8fHww",
      title: "التعلم المستمر",
      description: "منصة متكاملة لتطوير المهارات والمعرفة",
      buttonText: "انضم إلينا",
    },
    {
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Nob29sfGVufDB8fDB8fHww",
      title: "مستقبل التعليم",
      description: "نبني جيلاً مبدعاً وواعداً",
      buttonText: "تعرف علينا",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-arabic flex flex-col">
      {/* Header */}

      {/* Main Content Container */}
      <main className="flex-grow container mx-auto px-4 py-8 space-y-16">
        {/* Hero Slider */}
        <div className="relative h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`
                absolute inset-0 transition-all duration-700 ease-in-out
                ${
                  index === activeSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }
              `}
            >
              <div className="grid md:grid-cols-2 gap-8 mt-10 bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                {/* Image Section */}
                <div className="relative group">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center p-8 text-right space-y-6">
                  <h2 className="text-4xl font-bold text-[#2C5E78] leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="
                        px-8 py-3 bg-[#2C5E78] text-white 
                        rounded-full hover:bg-[#3A7A9E] 
                        transition-all duration-300 
                        shadow-md hover:shadow-lg
                      "
                    >
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === activeSlide ? "bg-[#2C5E78] w-8" : "bg-gray-300"}
                `}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🎓",
              title: "برامج متخصصة",
              description: "برامج تعليمية مصممة لتلبية احتياجات كل متعلم",
            },
            {
              icon: "📚",
              title: "موارد متكاملة",
              description: "مكتبة شاملة من الموارد التعليمية المتطورة",
            },
            {
              icon: "🌐",
              title: "تعلم تفاعلي",
              description: "منصة تعليمية تفاعلية تدعم التعلم الذكي",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="
                bg-white p-6 rounded-xl shadow-md text-center 
                hover:shadow-xl transition-all 
                transform hover:-translate-y-4 
                border-b-4 border-[#2C5E78]
              "
            >
              <div className="text-5xl mb-4 transform hover:rotate-12 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#2C5E78] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      {/* Footer */}
      <footer className="bg-[#2C5E78] text-white py-12 dir-rtl">
        <div className="container mx-auto px-48 grid md:grid-cols-2 gap-8">
          <div className="text-right mr-32">
            <h4 className="text-2xl font-bold mb-4">: استكشف</h4>
            <p>الموقع الرسمي لمركز تقويم وتعليم الطفل</p>
            <p>برنامج فرز عسر القراءة</p>
            <p>برنامج التدخل العلاجي ...أنا أقرأ وأكتب</p>
            <p>إصدارات المركز الإعلامي</p>
          </div>
          <div className="text-right mr-0">
            <h4 className="text-2xl font-bold mb-4">طرق التواصل</h4>
            <p className="flex justify-end items-center gap-2">
              <span>
                العنوان: السرة - ق4 شارع 14 ص ب: 5453 الصفاة - رمز بريدي 13055
                الكويت
              </span>
              <span>📍</span>
            </p>
            <p className="flex justify-end items-center gap-2">
              <span>1832000</span>
              <span>📞</span>
            </p>
            <p className="flex justify-end items-center gap-2">
              <span>
                بريد إلكتروني:{" "}
                <a href="mailto:info@ccetkuwait.org">info@ccetkuwait.org</a>
              </span>
              <span>✉️</span>
            </p>
            <div className="flex flex-col text-right mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gray-300 transition-colors"
              >
                <i className="fab fa-instagram ml-2"></i>
                <span>@ccetkuwait</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-gray-300 transition-colors mt-2"
              >
                <i className="fa-brands fa-youtube ml-2"></i>
                <span>مركز تقويم وتعليم الطفل</span>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p>© {new Date().getFullYear()} مركز التعليم. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
