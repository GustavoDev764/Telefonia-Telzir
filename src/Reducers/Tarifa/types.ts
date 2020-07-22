export const taxas = [
  { origem: "011", destino: "016", min: 1.9 },
  { origem: "016", destino: "011", min: 2.9 },
  { origem: "011", destino: "017", min: 1.7 },
  { origem: "017", destino: "011", min: 2.7 },
  { origem: "011", destino: "018", min: 0.9 },
  { origem: "018", destino: "011", min: 1.9 },
];

export interface planos {
  falemais30: "FaleMais 30";
  falemais60: "FaleMais 60";
  falamais120: "FaleMais 120";
}

/**
 * Actions Types
 */
export enum TarifaTypes {
  SET_CALCULO = "@SET_CALCULO",
  SET_NUMBER_TIME = "@SET_NUMBER_TIME",
  SET_PLANO = "@SET_PLANO",
  SET_ORIGEM = "@SET_ORIGEM",
  SET_DESTINO = "@SET_DESTINO",
}

export interface TarifaState {
  readonly Taxas: Array<TarifaArrayTypes>;
  readonly Time: Number;
  readonly Origem: String;
  readonly Destino: String;
  readonly ListCalculo: Array<TarifaPlanos>;
  readonly Plano: String;
  readonly ListPlanos: planos;
}

export interface TarifaArrayTypes {
  origem: String;
  destino: String;
  min: Number;
}

export interface TarifaPlanos {
  origem: String;
  destino: String;
  time: Number;
  nameplano: String;
  comfalemais: String;
  semfalemais: String;
}
