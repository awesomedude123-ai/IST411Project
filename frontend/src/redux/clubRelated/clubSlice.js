import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    clublist:[],
    typelist:[],
    loading:false,
    subloading:false,
    error: null,
    response: null,
    getresponse:null,
    tempDetails:[],
    clubDetails:[],
};

const clubSlice = createSlice({
    name: 'club',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getTypesSuccess: (state, action) => {
            state.typelist = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.typelist = [];
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getSuccess: (state, action) => {
            state.clublist = action.payload;
            state.loading = false;
            state.error = null;
            state.getresponse = false;
            state.status="success";
        },
        getFailedTwo: (state, action) => {
            state.clublist = [];
            state.getresponse = action.payload;
            state.loading = false;
            state.error = null;
            state.status = 'failed';
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = 'error';
        },
        authRequest: (state) => {
            state.status = 'loading';
            state.response = null;
            state.error = null;
        },
        authFailed: (state, action) => {
            state.status = 'failed';
            state.response = action.payload;
        },
        stuffAdded: (state, action) => {
            state.status = 'added';
            state.response = null;
            state.error = null;
            state.tempDetails = action.payload;
        },
        authError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
        },
        detailsSuccess: (state, action) => {
            state.clubDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
    },
});


export const {
    getFailedTwo,
    getSuccess,
    getError,
    getRequest,
    authRequest,
    authFailed,
    stuffAdded,
    authError,
    underControl,
    getTypesSuccess,
    getFailed,
    detailsSuccess
} = clubSlice.actions;

export const clubReducer = clubSlice.reducer;