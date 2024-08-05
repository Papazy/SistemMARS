import React from "react";
import bg from "../assets/bg-3.png";
import icon1 from "../assets/icon-cleareance.png";
import icon2 from "../assets/icon-medic.png";
import icon3 from "../assets/icon-change.png";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3001/api/Register${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  return (
    <div>
      <div
        className="font-bold bg-cover bg-center w-full h-screen"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <div className="">
          <Navbar />
          <div className="pt-[265px] px-[100px] w-[60%]">
            <div className="flex gap-[8px] text-[80px]">
              <div className="text-[#fff]">COME TO</div>
              <div className="text-[#1A719C]">MARS</div>
            </div>
            <div className="text-[#c3ebff] text-[16px] font-normal w-[80%]">
              MALACCA AND ANDAMAN INTEGRATED REGISTRATION ON MEDICAL EVACUATION
              SEA CLEARANCE, AND MARITIME CREW CHANGE INFORMATION SYSTEM
            </div>
            <div className="text-[20px] pt-[50px]  align-center text-center font-normal text-[#fff]">
              "Your gateway to seamless ship clearance, swift medical
              evacuations, and efficient crew changes."
            </div>
          </div>
        </div>
      </div>
      <div className="px-[100px] font-bold">
        <div id="services" className="pt-[100px]">
          <div className="flex gap-[8px] justify-center text-[48px]">
            <div className="">OUR</div>
            <div className="text-[#1A719C]">SERVICES</div>
          </div>
          <div className="flex justify-center text-center pt-[50px] gap-[50px]">
            <div className="border rounded-xl px-2 py-5 shadow flex justify-center flex-col items-center max-w-[400px] hover:scale-105 transform transition">
              <img src={icon1} alt="Cleareance Ship" width={"100px"} />
              <div className="text-[24px]">Clearance Ship</div>
              <div className="text-[#5C5C68] text-[14px]">
                Streamline your vessel clearance process with our efficient
                services
              </div>
            </div>
            <div className="border rounded-xl px-2 py-5 shadow flex justify-center flex-col items-center max-w-[400px] hover:scale-105 transform transition">
              <img src={icon2} alt="Cleareance Ship" width={"100px"} />
              <div className="text-[24px]"> IT Support</div>
              <div className="text-[#5C5C68] text-[14px]">
                Immigration registration on crew or passenger that need medical
                evacuation
              </div>
            </div>
            <div className="border rounded-xl px-2 py-5 shadow flex justify-center flex-col items-center max-w-[400px] hover:scale-105 transform transition">
              <img src={icon3} alt="Cleareance Ship" width={"100px"} />
              <div className="text-[24px]">Crew Change</div>
              <div className="text-[#5C5C68] text-[14px]">
                Smooth crew changeovers to keep your operations running
                seamlessly
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper flex items-center justify-center">
          <div id="ship" className="py-[150px]">
            <div className="flex gap-[8px] justify-center text-[32px]">
              <div className="">Ship</div>
              <div className="text-[#1A719C]">Arrival & Departure</div>
              <div className="">Data Form</div>
            </div>
            <div className="text-[#5C5C68] text-[16px] text-center px-[100px] py-[20px]">
              Efficiently manage ship arrivals and departures with our
              streamlined data submission form
            </div>
            <div className="flex justify-center">
              <a href="/arrival">
                <button
                  type="submit"
                  className="w-[175px] h-[50px] bg-[#1A719C] rounded-[20px] text-white "
                >
                  Fill in your details
                </button>
              </a>
            </div>
          </div>
          <div id="crew" className="border-l-2">
            <div className="flex gap-[8px] justify-center text-[32px]">
              <div className="">Crew</div>
              <div className="text-[#1A719C]">Sign-On & Sign-Off</div>
              <div className="">Data Form</div>
            </div>
            <div className="text-[#5C5C68] text-[16px] text-center px-[100px] py-[20px]">
              Simplify crew management with our user-friendly form for seamless
              sign-on and sign-off processes
            </div>
            <div className="flex justify-center">
              <a href="/sign-on">
                <button
                  type="submit"
                  className="w-[190px] h-[50px] bg-[#1A719C] rounded-[20px] text-white "
                >
                  Fill your crew details
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
