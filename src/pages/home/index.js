import { useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

//Components
import Slick from './components/slick';
import Header from './components/header';

// Actios
import { getShortsList } from "../../redux/actions/home";

// Stylesheets
import './public/stylesheets/style.scss';
import "rc-drawer/assets/index.css";

const Index = () => {
  
  const dispatch = useDispatch();
  const [ searchParams    , setSearchParams ] = useSearchParams();
  const tabType = searchParams.get('tabType') || "foryou";
  
  useLayoutEffect(() => {
    callAPI();
  }, [tabType]);

  const callAPI = async () => {
    await dispatch(getShortsList({
      other: {
        type     : tabType || 'foryou'
      }
    }));
  };

  return (
    <>
      <Header />
      <Slick 
        tabType = {tabType}
      />
    </>
  );
};

export default Index;
