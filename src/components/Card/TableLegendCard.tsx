function TableLegendCard() {
  return (
    <div className="h-fit w-full overflow-x-auto rounded-box bg-gradient-to-br from-base-100/10 to-primary/10 p-6 ring-1 ring-primary/20">
      <h2 className="mb-5 text-2xl font-bold text-primary">
        Scala dell'indice della qualità dell'aria e legenda dei colori
      </h2>

      <div className="overflow-x-auto rounded-lg border border-base-content/25">
        <table className="table">
          <thead>
            <tr>
              <th className="font-bold text-black">AQI</th>
              <th className="text-wrap font-bold text-black">
                Livello di inquinamento atmosferico
              </th>
              <th className="text-wrap font-bold text-black">
                Implicazioni sulla salute
              </th>
            </tr>
          </thead>
          <tbody className="text-black">
            <tr className="bg-[#00af00]">
              <td>0 - 50</td>
              <td>Buono</td>
              <td className="text-wrap">
                L’inquinamento atmosferico presenta rischi minimi o nulli.
              </td>
            </tr>

            <tr className="bg-[#ffd100]">
              <td>51 - 100</td>
              <td>Discreto</td>
              <td className="text-wrap">
                Presenza di alcuni inquinanti che potrebbe sussistere un
                moderato problema sanitario per un numero molto ristretto di
                persone insolitamente sensibili
              </td>
            </tr>

            <tr className="bg-[#FFA500]">
              <td>101 - 150</td>
              <td>Moderato</td>
              <td className="text-wrap">
                I membri di gruppi sensibili possono sperimentare effetti sulla
                salute. È improbabile che il pubblico in generale ne risenta.
              </td>
            </tr>

            <tr className="bg-[#cd1b1b]">
              <td>151 - 200</td>
              <td>Scarso</td>
              <td className="text-wrap">
                Tutti possono iniziare a sperimentare effetti sulla salute. I
                gruppi più sensibili possono sperimentare effetti sulla salute
                più gravi.
              </td>
            </tr>

            <tr className="bg-[#ad05ad]">
              <td>201 - 300</td>
              <td>Pessimo</td>
              <td className="text-wrap">
                Avvisi sanitari sulle condizioni di emergenza. L’intera
                popolazione ha maggiori probabilità di essere colpita.
              </td>
            </tr>

            <tr className="bg-[#7e0023]">
              <td>300+</td>
              <td>Pericoloso</td>
              <td className="text-wrap">
                Avviso sanitario: tutti potrebbero riscontrare effetti sulla
                salute più gravi
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableLegendCard;
