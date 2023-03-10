import {createSlice} from '@reduxjs/toolkit'
import {uuidv4} from "../../utils/uuid";

const initialState = {
  // data is normalized, because it is fast way to get data, and it will be useful in scope of dnd reorder
  byId: {},
  allIds: [],
  isAddNewProject: false,
}

export const counterSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    toggleIsAddNewMode: (state) => {
      state.isAddNewMode = !state.isAddNewMode
    },
    addNewModeProject: (state, {payload}) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const id = uuidv4();
      const dateOptions = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      const createdAt = new Date().toLocaleDateString("en-US", dateOptions);
      state.allIds.unshift(id);
      state.byId[id] = {...payload, id, createdAt}
    },
    updateProject: (state, {payload}) => {
      const projectData = state.byId[payload.id]
      if (projectData) {
        state.byId[payload.id] = {...projectData, ...payload}
      }
    },
    deleteProject: (state, {payload: {id}}) => {
      const {[id]: projectToRemove, ...restProjects} = state.byId;
      state.allIds = state.allIds.filter(projectId => id !== projectId);
      state.byId = restProjects;
    },
  },
})

export const {toggleIsAddNewMode, addNewModeProject, updateProject, deleteProject} = counterSlice.actions

export const selectAllProjectsIds = (state) => state.projects.allIds
export const selectAllIsAddNewMode = (state) => state.projects.isAddNewMode
export const selectProjectById = (id) => (state) => state.projects.byId[id]

export default counterSlice.reducer
