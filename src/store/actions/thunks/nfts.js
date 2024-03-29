import { Axios, Canceler } from '../../../core/utils/axios';
import * as actions from '../../actions';
import api from '../../../core/utils/api';

export const fetchNftsBreakdown = (authorId, isMusic = false) => async (dispatch, getState) => {
  
  //access the state
  const state = getState();
  

  dispatch(actions.getNftBreakdown.request(Canceler.cancel));

  try {
    let filter = authorId ? 'author='+authorId : '';
    let music = isMusic ? 'category=music' : '';

    const { data } = await Axios.get(`${api.baseUrl}${isMusic ? '/nfts_music.json' : api.nfts}?${filter}&${music}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftBreakdown.success(data));
  } catch (err) {
    dispatch(actions.getNftBreakdown.failure(err));
  }
};

export const fetchNftShowcase = () => async (dispatch) => {

  dispatch(actions.getNftShowcase.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.nftShowcases}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftShowcase.success(data));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err));
  }
};

export const fetchNftDetail = (nftId) => async (dispatch) => {

  dispatch(actions.getNftDetail.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.nfts}/${nftId}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftDetail.success(data));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err));
  }
};
