import React from "react";
// import "./footer.css"; // Assuming you have a CSS file for styles

const Footer = () => {
  return (
    <footer className="footer mb-10 px-20">
      <div className="discover">
        <h4 className="my-2">استكشف:</h4>
        <div className="">
          <p>الموقع الرسمي لمركز تقويم وتعليم الطفل</p>
          <p>برنامج فرز عسر القراءة</p>
          <p>برنامج التدخل العلاجي ...أنا أقرأ وأكتب</p>
          <p>إصدارات المركز الإعلامي</p>
        </div>
      </div>
      <div className="contact-info">
        <h4 className="my-2">طرق التواصل</h4>
        <p>
          <i className="fa-solid fa-house"></i> العنوان: السرة - ق4 شارع 14 ص ب:
          5453 الصفاة - رمز بريدي 13055 الكويت
        </p>
        <p>
          <i className="fa-solid fa-phone"></i> هاتف: 1832000
        </p>
        <p>
          <i className="fa-solid fa-envelope"></i> بريد إلكتروني:{" "}
          <a href="mailto:info@ccetkuwait.org">info@ccetkuwait.org</a>
        </p>
        <div className="social-icons transform translate-x-[10px] -translate-y-[15px]">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram text-lg ml-2"></i>
            <span>@ccetkuwait</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <i className="fa-brands fa-youtube text-lg  ml-2 mt-2"></i>
            <span>مركز تقويم وتعليم الطفل</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
