import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ITurno } from "../../../../utils/types";
import { fetchFromServer } from "../../../../utils/APICalls";
import Heading from "../../../../components/Heading";
import Button from "../../../../components/Button";
import HorariosModal from "./HorariosModal";
import TurnoForm from "./TurnoForm";

moment.tz.setDefault("GMT0");

moment.locale("es", {
  months:
    "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_"
    ),
  monthsShort:
    "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
  weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
  weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
});
const localizer = momentLocalizer(moment);

const TurnosDashboard = () => {
  const [turnos, setTurnos] = React.useState<ITurno[]>([] as ITurno[]);
  const [activeTurno, setActiveTurnos] = React.useState<string | null>(null);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [shouldReRender, setShouldReRender] = React.useState<boolean>(false);
  const formats = {
    eventTimeRangeFormat: () => {
      return "";
    },
  };

  const parseTurnos = (turnosArray: ITurno[]) => {
    turnosArray = turnosArray.map((unTurno: ITurno) => ({
      ...unTurno,
      start: moment(unTurno.fecha).toDate(),
      end: moment(unTurno.fecha).add(30, "m").toDate(),
    }));

    setTurnos(turnosArray);

    return turnosArray;
  };

  const fetchAndParseTurnos = React.useCallback(async () => {
    const res = await fetchFromServer("/turnos", "GET");
    parseTurnos(res?.data.info);
  }, []);

  React.useEffect(() => {
    fetchAndParseTurnos();
  }, [fetchAndParseTurnos, shouldReRender]);

  const handleCrearNuevo = () => {
    setActiveTurnos("nuevo");
  };

  return (
    <main className="adm-turnos">
      <HorariosModal
        isVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Heading title="Turnos" />
      {!activeTurno ? (
        <>
          <div className="adm-turnos-horarios">
            <Button variant="filled-pink" onClick={() => setModalVisible(true)}>
              Definir horarios de atencion
            </Button>
            <Button variant="filled-pink" onClick={handleCrearNuevo}>
              Crear Nuevo{" "}
              <img
                src="./img/imas.png"
                alt=""
                style={{ width: "25px", height: "25px" }}
              />
            </Button>
          </div>
          <div className="admin-turnos-calendar">
            <Calendar
              localizer={localizer}
              events={turnos && turnos}
              messages={{
                date: "Fecha",
                time: "Horario",
                event: "Asunto",

                next: "sig",
                previous: "ant",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                noEventsInRange: "No encontramos eventos en este rango",
              }}
              formats={formats}
              startAccessor="start"
              endAccessor="end"
              titleAccessor="asunto"
              style={{ height: 650 }}
              selectable
              onSelectEvent={(ev) => {
                setActiveTurnos(ev._id);
              }}
              tooltipAccessor="email"
              scrollToTime={new Date()}
              enableAutoScroll={true}
            />
          </div>
        </>
      ) : (
        <TurnoForm
          turnos={turnos}
          turno={activeTurno}
          setActiveTurno={setActiveTurnos}
          setShouldReRender={setShouldReRender}
        />
      )}
    </main>
  );
};

export default TurnosDashboard;
