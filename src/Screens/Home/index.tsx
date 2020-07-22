import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { ApplicationState } from "../../Store";
import * as TarifaActions from "../../Reducers/Tarifa/actions";
import {
  TarifaArrayTypes,
  planos,
  TarifaPlanos,
} from "../../Reducers/Tarifa/types";

//import messages
import Messages from "../../Components/Messagem";

interface StateProps {
  Taxas: Array<TarifaArrayTypes>;
  Destino: String;
  Origem: String;
  Time: Number;
  Plano: String;
  ListPlanos: planos;
  ListCalculo: Array<TarifaPlanos>;
}

interface DispatchProps {
  setOrigem(text: String): void;
  setDestino(text: String): void;
  setTime(time: Number): void;
  setPlano(text: String): void;
  calcula(): void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class HomeScreen extends Component<Props> {
  onChangerOrigem = (e: React.FormEvent<HTMLSelectElement>) => {
    let origem = e.currentTarget.value;
    const { setOrigem } = this.props;
    setOrigem(origem);
  };

  onChangerDestino = (e: React.FormEvent<HTMLSelectElement>) => {
    let destino = e.currentTarget.value;
    const { setDestino } = this.props;
    setDestino(destino);
  };

  onChangerTime = (e: React.FormEvent<HTMLInputElement>) => {
    let time = parseInt(e.currentTarget.value);
    const { setTime } = this.props;
    setTime(time);
  };

  onChangerPlano = (e: React.FormEvent<HTMLSelectElement>) => {
    let plano = e.currentTarget.value;
    const { setPlano } = this.props;
    setPlano(plano);
  };

  renderOrigem = () => {
    const { Taxas } = this.props;
    let list: any = [];
    return Taxas.map((item, index) => {
      let t = "" + item.origem;
      if (list[t] === undefined) {
        list[t] = t;

        return (
          <option key={index} value={"" + item.origem}>
            {item.origem}
          </option>
        );
      }
    });
  };

  formatNumber = (n: String): String => {
    let m = parseFloat("" + n).toFixed(2);
    return m;
  };

  render() {
    const {
      Taxas,
      Origem,
      calcula,
      Time,
      Plano,
      ListPlanos,
      ListCalculo,
    } = this.props;
    return (
      <div className="container mt-5">
        <h1>Telefonia Telzir</h1>
        <form>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="sel1">Selecione a Origem:</label>
                <select
                  value={"" + Origem}
                  onChange={this.onChangerOrigem}
                  className="form-control"
                  id="sel1"
                  name="sellist1"
                >
                  <option value="">--</option>
                  {this.renderOrigem()}
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="sel1">Selecione a Destino:</label>
                <select
                  onChange={this.onChangerDestino}
                  className="form-control"
                  id="sel1"
                  name="sellist1"
                >
                  {Origem !== "" ? <option value="">--</option> : null}
                  {Origem !== "" ? (
                    Taxas.map((item, index) => {
                      if (item.origem === Origem) {
                        return (
                          <option value={"" + item.destino}>
                            {item.destino}
                          </option>
                        );
                      }
                    })
                  ) : (
                    <option>-- Selecione primeiro a origem --</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="tmminuto">Digite o tempo em minuto:</label>
                <input
                  type="number"
                  min={0}
                  value={"" + Time}
                  onChange={this.onChangerTime}
                  className="form-control"
                  id="tmminuto"
                  placeholder="Digite o tempo em minuto"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="sel1">Selecione o Plano:</label>
                <select
                  value={"" + Plano}
                  onChange={this.onChangerPlano}
                  className="form-control"
                  id="sel1"
                  name="sellist1"
                >
                  <option value="">--</option>
                  <option value={"" + ListPlanos.falemais30}>
                    {ListPlanos.falemais30}
                  </option>
                  <option value={"" + ListPlanos.falemais60}>
                    {ListPlanos.falemais60}
                  </option>
                  <option value={"" + ListPlanos.falamais120}>
                    {ListPlanos.falamais120}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              calcula();
            }}
            className="btn btn-primary"
          >
            Calcula
          </button>
        </form>
        <div className="mt-5">
          <table className="table table-hover table-inverse">
            <thead>
              <tr>
                <th>Origem</th>
                <th>Destino</th>
                <th>Tempo</th>
                <th>Plano FaleMais</th>
                <th>Com FaleMais</th>
                <th>Sem FaleMais</th>
              </tr>
            </thead>
            <tbody>
              {ListCalculo.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.origem}</td>
                    <td>{item.destino}</td>
                    <td>{item.time}</td>
                    <td>{item.nameplano}</td>
                    <td>{this.formatNumber(item.comfalemais)}</td>
                    <td>{this.formatNumber(item.semfalemais)}</td>
                  </tr>
                );
              }).reverse()}
            </tbody>
          </table>
        </div>
        <Messages />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  Taxas: state.TarifaReducer.Taxas,
  Destino: state.TarifaReducer.Destino,
  Origem: state.TarifaReducer.Origem,
  Time: state.TarifaReducer.Time,
  Plano: state.TarifaReducer.Plano,
  ListPlanos: state.TarifaReducer.ListPlanos,
  ListCalculo: state.TarifaReducer.ListCalculo,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(TarifaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
