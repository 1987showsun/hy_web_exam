import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

//Components
import Profile from './components/profile';
import Tab from './components/tab';
import ShortsList from './components/list';
import Drawer from './components/drawer';

// Actios
import { getAccount, getCollection } from "../../redux/actions/account"; 

// Stylesheets
import './public/stylesheets/style.scss';
import "rc-drawer/assets/index.css";

const Index = () => {
  
  const dispatch = useDispatch();
  
  useLayoutEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    await dispatch(getCollection({}));
    await dispatch(getAccount({}));
  };

  return (
    <>
      <Profile />
      <Tab />
      <ShortsList />
      <Drawer />
    </>
  );
};

export default Index;
