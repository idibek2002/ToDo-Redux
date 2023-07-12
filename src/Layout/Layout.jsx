import React, { useEffect, useState } from "react";
import "./Layout.css";
import logo from "./images/Лого.png";
import { Link, Outlet } from "react-router-dom";
import { Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import Aos from "aos";
import Switcher from "../components/Switcher/Switcher";
import { Drawer } from "antd";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import messenger from "../Layout/images/Соцсети.svg";
import Loader from "../components/Loader/Loader";
import {useLocation } from 'react-router-dom';

const Layout = () => {
  const { t, i18n } = useTranslation();
  const changeLanguages = (Language) => {
    i18n.changeLanguage(Language);
  };
  useEffect(() => {
    Aos.init();
  }, []);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  console.log(location);

  return (
    <>
      <header className="py-[35px] bg-[#FFF] dark:bg-[#000000]">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex items-center justify-between px-[10px]">
            <Link to={"/"}>
              <div className="logo">
                <img src={logo} alt="" className="w-[150px] lg:w-[130px]" />
              </div>
            </Link>
            <nav className="w-[55%] lg:w-[70%] md:hidden">
              <ul className="text-[#1F2428] text-[15px] font-[600] flex items-center justify-between lg:text-[13px] gap-[10px] dark:text-[#d8d8d8]">
                <Link to={"howtobuy"} onClick={() => setActiveLink('howtobuy')} className={location.pathname === '/howtobuy' ? 'active' : ''}>{t("header.text1")}</Link>
                <Link to={"sales"} onClick={() => setActiveLink('sales')} className={location.pathname === '/sales' ? 'active' : ''}>{t("header.text2")}</Link>
                <Link to={"prices"} onClick={() => setActiveLink('prices')} className={location.pathname === '/prices' ? 'active' : ''}>{t("header.text3")}</Link>
                <Link>{t("header.text4")}</Link>
                <Link to={"bonuses"} onClick={() => setActiveLink('bonuses')} className={location.pathname === '/bonuses' ? 'active' : ''}>{t("header.text5")}</Link>
                <Link to={"blog"} onClick={() => setActiveLink('blog')} className={location.pathname === '/blog' ? 'active' : ''}>{t("header.text6")}</Link>
                <Link to={"shops"} onClick={() => setActiveLink('shops')} className={location.pathname === '/shops' ? 'active' : ''}>{t("header.text7")}</Link>
              </ul>
            </nav>
            <div className="flex items-center gap-[10px]">
              <Space wrap>
                <Select
                  defaultValue={i18n.language}
                  style={{
                    width: 65,
                  }}
                  onChange={changeLanguages}
                  options={[
                    {
                      value: "ru",
                      label: "Ru",
                    },
                    {
                      value: "en",
                      label: "En",
                    },
                  ]}
                />
              </Space>
              <button className="w-[180px] text-[#FFF] px-[20px] py-[10px] bg-[#00C97B] rounded-[50px] text-[13px] lg:hidden">
              {t("header.text8")}
              </button>
              <Switcher />
              <div className="hidden md:flex">
                <IconButton aria-label="delete" onClick={showDrawer}>
                  <MenuIcon className="dark:text-[#FFF]" />
                </IconButton>
              </div>
              <Drawer
                title={
                  <div className="logo flex items-center justify-center">
                    <img src={logo} alt="" className="w-[150px] lg:w-[130px]" />
                  </div>
                }
                placement="right"
                onClose={onClose}
                open={open}
                className="dark:bg-black"
              >
                <nav className="w-[55%] lg:w-[70%]">
                  <ul className="text-[#1F2428] text-[18px] font-[600] flex flex-col  justify-between gap-[10px] dark:text-[#d8d8d8]">
                    <Link to={"howtobuy"} onClick={onClose}>
                    {t("header.text1")}
                    </Link>
                    <Link to={"/sales"} onClick={onClose}>
                    {t("header.text2")}
                    </Link>
                    <Link to={"prices"} onClick={onClose}>
                    {t("header.text3")}
                    </Link>
                    <Link onClick={onClose}>{t("header.text4")}</Link>
                    <Link onClick={onClose} to={"/bonuses"}>
                    {t("header.text5")}
                    </Link>
                    <Link to={"/blog"} onClick={onClose}>
                    {t("header.text6")}
                    </Link>
                    <Link onClick={onClose} to={"/shops"}>
                    {t("header.text7")}
                    </Link>
                  </ul>
                </nav>
              </Drawer>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="pt-[35px] bg-[#FFF] dark:bg-black">
        <div className="max-w-[1320px] mx-auto px-[10px]">
          <div className="flex justify-between md:flex-col">
            <div className="logo">
              <div className="logoimage flex flex-col gap-y-[30px]">
                <img src={logo} alt="" className="w-[160px] lg:w-[130px]" />
                <img
                  src={messenger}
                  alt=""
                  className="w-[150px] lg:w-[130px]"
                />
              </div>
            </div>
            <nav className="flex justify-between w-[70%] py-[20px] lg:w-[80%] md:flex-wrap md:w-full gap-y-[20px]  dark:text-[#d8d8d8]">
              <ul className="text-[#1F2428] flex flex-col gap-y-[10px] dark:text-[#d8d8d8]">
                <h1 className="font-[700]">{t("footer.text1")}</h1>
                <li>
                  <Link className="font-[300] text-[13px]">{t("footer.text2")}</Link>
                </li>
                <li>
                  <Link to={"prices"} className="font-[300] text-[13px]">
                  {t("footer.text3")}
                  </Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">{t("footer.text4")}</Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">{t("footer.text5")}</Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">{t("footer.text6")}</Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text7")}
                  </Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text8")}
                  </Link>
                </li>
              </ul>
              <ul className="text-[#1F2428] flex flex-col gap-y-[10px] dark:text-[#d8d8d8]">
                <h1 className="font-[700]">{t("footer.text9")}</h1>

                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text10")}
                  </Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text11")}
                  </Link>
                </li>
                <li>
                  <Link to={"/FAQ"} className="font-[300] text-[13px]">
                  {t("footer.text12")}
                  </Link>
                </li>
                <li>
                  <Link to={"/shops"} className="font-[300] text-[13px]">
                  {t("footer.text13")}
                  </Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text14")}
                  </Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text15")}
                  </Link>
                </li>
              </ul>
              <ul className="text-[#1F2428] flex flex-col gap-y-[10px] dark:text-[#d8d8d8]">
                <h1 className="font-[700]">{t("footer.text16")}</h1>
                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text17")}
                  </Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text18")}
                  </Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text19")}
                  </Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">
                  {t("footer.text20")}
                  </Link>
                </li>
                <li>
                  <Link className="font-[300] text-[13px]">{t("footer.text21")}</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="py-[20px] border-t border-[#C0C9D7]">
            <h1 className="text-[#1F2428] text-[13px] text-center dark:text-[#d8d8d8]">
            {t("footer.text22")}
            </h1>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
