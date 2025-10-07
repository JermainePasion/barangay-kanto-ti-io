import React from "react";

const teamMembers = [
  {
    name: "David Harry Depona",
    role: "Researcher and Designer",
    image: "david.jpg",
    socials: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Musashi Gucci Esquivel",
    role: "UI/UX",
    image: "musashi.jpg",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Jermaine Riley Pasion",
    role: "Web Developer",
    image: "jermaine.jpg",
    socials: {
      dribbble: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

function AboutUs() {
  return (
    <div className="bg-[#FEF3E2] dark:bg-[#121212] min-h-screen py-16 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#2E2E2E] dark:text-[#E0E0E0] mb-12">
        Meet the <span className="text-[#FAB12F]">team</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#374151] rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow"
          >
            <div className="relative overflow-hidden">
              <img
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                className="w-full h-64 sm:h-72 md:h-80 lg:h-150 object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <svg
                className="absolute bottom-0 left-0 w-full h-12 sm:h-14 md:h-16 lg:h-20 animate-wave"
                viewBox="0 0 500 50"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 C150,50 350,0 500,50 L500,50 L0,50 Z"
                  className="fill-[#FEF3E2] dark:fill-[#121212]"
                />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#2E2E2E] dark:text-[#E0E0E0]">
                {member.name}
              </h3>
              <p className="text-[#6b7280] dark:text-[#9ca3af] mt-1">{member.role}</p>
              <div className="flex justify-center space-x-4 mt-4">
                {Object.keys(member.socials).map((key) => (
                  <a
                    key={key}
                    href={member.socials[key]}
                    className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#FAB12F] dark:hover:text-[#FAB12F] transition-colors transform hover:scale-110"
                  >
                    <i className={`fab fa-${key} fa-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fourth card - Nash */}
      <div className="mt-8 flex justify-center">
  <div className="relative w-full max-w-md rounded-xl">
    {/* Animated rainbow border */}
    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 
      bg-[length:200%_200%] animate-rainbow border-2 border-transparent z-0"></div>

    {/* Card content */}
    <div className="relative bg-[#FAB12F] dark:bg-[#FA812F] rounded-xl shadow-2xl overflow-hidden w-full transform transition-transform duration-500 hover:scale-105 z-10">
      <div className="relative overflow-hidden">
        <img
          src="nash.png"
          alt="Nash, Special Contributor"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-150 object-cover"
        />
        <svg
          className="absolute bottom-0 left-0 w-full h-12 sm:h-14 md:h-16 lg:h-20 animate-wave"
          viewBox="0 0 500 50"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,50 350,0 500,50 L500,50 L0,50 Z"
            className="fill-[#FEF3E2] dark:fill-[#121212]"
          />
        </svg>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-white dark:text-[#E0E0E0]">Nash</h3>
        <p className="text-white/90 dark:text-[#9ca3af] mt-1">Special Contributor</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="#"
            className="text-white/90 dark:text-[#9ca3af] hover:text-[#121212] dark:hover:text-[#FAB12F] transition-colors transform hover:scale-110"
          >
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a
            href="#"
            className="text-white/90 dark:text-[#9ca3af] hover:text-[#121212] dark:hover:text-[#FAB12F] transition-colors transform hover:scale-110"
          >
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a
            href="#"
            className="text-white/90 dark:text-[#9ca3af] hover:text-[#121212] dark:hover:text-[#FAB12F] transition-colors transform hover:scale-110"
          >
            <i className="fab fa-linkedin-in fa-lg"></i>
          </a>
        </div>
      </div>
    </div>

    <style>
      {`
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rainbow {
          animation: rainbow 4s linear infinite;
        }
      `}
    </style>
  </div>
</div>

      <style>
        {`
          @keyframes wave {
            0% { transform: translateX(0); }
            50% { transform: translateX(-10px); }
            100% { transform: translateX(0); }
          }
          .animate-wave {
            animation: wave 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default AboutUs;
