const Leaderboard: React.FC = () => {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">League Leaderboard</h2>
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Rank</th>
                <th className="text-left">Team</th>
                <th className="text-left">Wins</th>
                <th className="text-left">Losses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Team A</td>
                <td>10</td>
                <td>2</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Team B</td>
                <td>9</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  };
  
  export default Leaderboard;
  