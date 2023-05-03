const MyTeams = () => {
    const [teams, setTeams] = useState([]);
    const getTeams = () => {
        getMyTeams().then(teams => setTeams(teams));
    };

    useEffect(() =>{
        getTeams();
    }, []);

    return(
        <div className="container">
            <div className="row justify-content-center">
        {teams.map((team) => (
            <>
          <Team team={team} key={team.id} />
          </>
        ))}
      </div>
        </div>
    )
};

export default MyTeams;