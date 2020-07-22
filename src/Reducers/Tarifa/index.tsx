import { Reducer } from "redux";
import { toastr } from "react-redux-toastr";
import { TarifaTypes, TarifaState, taxas, TarifaArrayTypes } from "./types";

export const INITIAL_STATE: TarifaState = {
  Taxas: taxas,
  Time: 0,
  Destino: "",
  Origem: "",
  Plano: "",
  ListPlanos: {
    falemais30: "FaleMais 30",
    falemais60: "FaleMais 60",
    falamais120: "FaleMais 120",
  },
  ListCalculo: [],
};

const reducer: Reducer<TarifaState> = (state = INITIAL_STATE, action) => {
  let { Plano, ListPlanos, Time, Origem, Destino, Taxas, ListCalculo } = state;
  switch (action.type) {
    case TarifaTypes.SET_ORIGEM:
      let origem = action.payload;
      return { ...state, Origem: origem };

    case TarifaTypes.SET_DESTINO:
      let destino = action.payload;
      return { ...state, Destino: destino };

    case TarifaTypes.SET_NUMBER_TIME:
      return { ...state, Time: action.payload };

    case TarifaTypes.SET_PLANO:
      return { ...state, Plano: action.payload };

    case TarifaTypes.SET_CALCULO:
      const tax = parseFloat("" + getTaxa(Origem, Destino, Taxas));
      let comfalemais = "0";
      let semfalemais = "0";
      if (Origem !== "" && Destino !== "" && Time > 0 && Plano !== "") {
        switch (Plano) {
          case ListPlanos.falemais30:
            comfalemais = "" + comFaleMais(Time, tax, 30);
            semfalemais = "" + semFaleMais(Time, tax);
            break;

          case ListPlanos.falemais60:
            comfalemais = "" + comFaleMais(Time, tax, 60);
            semfalemais = "" + semFaleMais(Time, tax);
            break;

          case ListPlanos.falamais120:
            comfalemais = "" + comFaleMais(Time, tax, 120);
            semfalemais = "" + semFaleMais(Time, tax);
            break;
        }
        ListCalculo.push({
          origem: Origem,
          destino: Destino,
          time: Time,
          nameplano: Plano,
          comfalemais,
          semfalemais,
        });

        return {
          ...state,
          Origem: "",
          Destino: "",
          Plano: "",
          Time: 0,
          ListCalculo,
        };
      } else {
        alert("Por favor prencha todo so campos");
      }

      return state;

    default:
      return state;
  }
};

export default reducer;

function getTaxa(
  origem: String,
  destino: String,
  taxas: Array<TarifaArrayTypes>
): Number {
  let mytaxa: Number = 0;
  taxas.map((item) => {
    if (item.origem === origem && destino === item.destino) {
      mytaxa = item.min;
    }
  });

  return mytaxa;
}

function comFaleMais(time: Number, taxa: Number, maxmin: Number): Number {
  let t: any = 0;
  let tax = parseFloat("" + taxa);
  let max = parseInt("" + maxmin);
  let res: Number = 0;

  if (time > max) {
    t = parseInt("" + time) - max;
    res = (tax * 0.1 + tax) * t;
  }

  return res;
}

function semFaleMais(time: Number, taxa: Number): Number {
  let tax = parseFloat("" + taxa);
  let res: Number = 0;
  res = parseInt("" + time) * tax;
  return res;
}
