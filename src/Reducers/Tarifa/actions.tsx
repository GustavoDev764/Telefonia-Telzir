import { TarifaTypes } from "./types";

export const setOrigem = (text: String) => ({
  type: TarifaTypes.SET_ORIGEM,
  payload: text,
});

export const setDestino = (text: String) => ({
  type: TarifaTypes.SET_DESTINO,
  payload: text,
});

export const setTime = (time: Number) => ({
  type: TarifaTypes.SET_NUMBER_TIME,
  payload: time,
});

export const setPlano = (text: String) => ({
  type: TarifaTypes.SET_PLANO,
  payload: text,
});

export const calcula = () => ({
  type: TarifaTypes.SET_CALCULO,
});
