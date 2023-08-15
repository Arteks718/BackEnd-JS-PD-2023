import axios from "axios";
const httpClient = axios.create({ baseURL: "http://localhost:5000/api/" });
const HEROES_SLICE_NAME = 'heroes'

export const createHttpHeroes = (hero) => httpClient.post(`/${HEROES_SLICE_NAME}`, hero)
export const getHttpHeroes = () => httpClient.get(`/${HEROES_SLICE_NAME}`);      
export const updateHttpHeroes = (hero) => httpClient.patch(`/${HEROES_SLICE_NAME}/${hero.id}`, hero.updatedData)
export const deleteHttpHeroes = (heroId) => httpClient.delete(`/${HEROES_SLICE_NAME}/${heroId}`)