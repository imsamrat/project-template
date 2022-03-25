import GemService from "../services/Gem/gemService";
import { loadEarlyAccessModules } from "./moduleEarlyAccessAction";

export const loadGem = () => {
  return async (dispatch) => {
    dispatch({type: "LOAD_GEM/PENDING"});
    try {
      const { data: apiResponse } = await GemService.getGemOfUser();
      dispatch({
        type: "LOAD_GEM/SUCCESS",
        payload:  apiResponse?.data?.totalGem
      });
      const earlyAccessModuleList = apiResponse?.data?.gemUsedFor.filter((data) => data?.topic === 'earlyReleaseModule' && data?.earlyReleaseModule)
      dispatch(loadEarlyAccessModules(earlyAccessModuleList));
    } catch (err) {
      dispatch({type: "LOAD_GEM/ERROR"});
    }
  };
};

export const gemIncrement = (payload) => {
  return {
    type: "GEM_INCREMENT",
    payload,
  };
};

export const gemDecrement = (payload) => {
  return {
    type: "GEM_DECREMENT",
    payload,
  };
};
