import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  playoffMatchData,
  updateBracket,
} from "../../store/playoffStageReducer";
import "./styles.css";

const MATCH_START = 49;

export const updateMatch = (
  teamChanged: string,
  match: playoffMatchData,
  newScore: number,
  toggleWinner: boolean
) => {
  const isTeamOneChanged = match.teamOne.name === teamChanged;
  const isTeamTwoChanged = match.teamTwo.name === teamChanged;

  if (isTeamOneChanged) {
    match.teamOneScore = newScore;
  } else if (isTeamTwoChanged) {
    match.teamTwoScore = newScore;
  }

  match.winner = toggleWinner
    ? match.winner === match.teamOne.name
      ? match.teamTwo.name
      : match.teamOne.name
    : match.winner;

  return match;
};

const EliminationForm: FC = () => {
  const playoffGames = useAppSelector((state) => state.playoffStage);
  const dispatch = useAppDispatch();

  const isWinnerChanged = (
    teamChanged: string,
    newScore: number,
    match: playoffMatchData
  ) => {
    const isTeamOne = match.teamOne.name === teamChanged;
    const isTeamTwo = match.teamTwo.name === teamChanged;

    const oldWinner = match.winner.slice();

    if (isTeamOne) {
      let newWinner: string;

      if (newScore > match.teamTwoScore) {
        // console.log("1")
        newWinner = match.teamOne.name;
      } else if (newScore < match.teamTwoScore) {
        // console.log("2")
        newWinner = match.teamTwo.name;
      } else {
        // TODO - Check Penalties here later on
        // console.log("3")
        newWinner = match.winner;
      }

      const isWinnerChanged = newWinner !== oldWinner;
      return isWinnerChanged;
    } else if (isTeamTwo) {
      let newWinner: string;

      if (newScore > match.teamOneScore) {
        // console.log("4")
        newWinner = match.teamTwo.name;
      } else if (newScore < match.teamOneScore) {
        // console.log("5")
        newWinner = match.teamOne.name;
      } else {
        // console.log("6")
        // TODO - Check Penalties here later on
        newWinner = match.winner;
      }

      const isWinnerChanged = newWinner !== oldWinner;
      return isWinnerChanged;
    }

    console.log("NO TEAMS MATCHED, teamChanged :");
    console.log(teamChanged);
    return true;
  };

  const handleChange = (e: any) => {
    const newScore = e.target.value;
    const name = e.target.name;

    const data = name.split("/");
    const matchChanged = Number(data[0]);

    const oldMatchData = playoffGames[matchChanged - MATCH_START];
    const oldWinner = oldMatchData.winner;

    const teamChanged =
      data[1] === oldMatchData.teamOne.name
        ? oldMatchData.teamOne
        : oldMatchData.teamTwo;

    const otherTeam =
      data[1] === oldMatchData.teamOne.name
        ? oldMatchData.teamTwo
        : oldMatchData.teamOne;

    const hasWinnerChanged = isWinnerChanged(
      teamChanged.name,
      newScore,
      oldMatchData
    );

    const adjustTeam =
      hasWinnerChanged && oldMatchData.winner === teamChanged.name
        ? otherTeam
        : teamChanged;

    console.log("isWinnerChanged - " + hasWinnerChanged.toString());

    dispatch(
      updateBracket(
        oldMatchData,
        oldWinner,
        teamChanged,
        adjustTeam,
        hasWinnerChanged,
        matchChanged,
        newScore
      )
    );
  };

  const roundOf16sortList = [49, 50, 53, 54, 51, 52, 55, 56];
  const sortedRoundof16 = playoffGames
    .filter((game) => {
      return game.matchNumber >= 49 && game.matchNumber <= 56;
    })
    .sort((a, b) => {
      return (
        roundOf16sortList.indexOf(a.matchNumber) -
        roundOf16sortList.indexOf(b.matchNumber)
      );
    });

  const quarterFinals = playoffGames.filter((game) => {
    return game.matchNumber >= 57 && game.matchNumber <= 60;
  });

  const semiFinals = playoffGames.filter((game) => {
    return game.matchNumber >= 61 && game.matchNumber <= 62;
  });

  const finals = playoffGames.filter((game) => {
    return game.matchNumber == 64;
  });

  return (
    <div className="container">
      <h1>World Cup 2022 Bracket</h1>
      <h2>Reference - CodePen Responsive Tournament Bracket</h2>
      <div className="tournament-bracket tournament-bracket--rounded">
        <div className="tournament-bracket__round tournament-bracket__round--quarterfinals">
          <h3 className="tournament-bracket__round-title">Round of 16</h3>
          <ul className="tournament-bracket__list">
            {sortedRoundof16.map((match) => {
              return (
                <li className="tournament-bracket__item">
                  <div className="tournament-bracket__match" tabIndex={0}>
                    <table className="tournament-bracket__table">
                      <caption className="tournament-bracket__caption">
                        <time dateTime="1998-02-18">
                          Match {match.matchNumber}
                        </time>
                      </caption>
                      <thead className="sr-only">
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className="tournament-bracket__content">
                        <tr className="tournament-bracket__team tournament-bracket__team--winner">
                          <td className="tournament-bracket__country">
                            <h5>
                              <span className={"flag:" + match.teamOne.flag} />{" "}
                              {match.teamOne.name}
                            </h5>
                            {/* <abbr className="tournament-bracket__code" title={match.teamOne.name}>{match.teamOne.name}</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-ca" aria-label="Flag"></span> */}
                          </td>
                          <td className="tournament-bracket__score">
                            <input
                              type="number"
                              id="teamOneScore"
                              name={
                                match.matchNumber + "/" + match.teamOne.name
                              }
                              min="0"
                              max="7"
                              onChange={handleChange}
                            />
                            {/* <span className="tournament-bracket__number">{match.teamOneScore}</span> */}
                          </td>
                        </tr>
                        <tr className="tournament-bracket__team">
                          <td className="tournament-bracket__country">
                            <h5>
                              <span className={"flag:" + match.teamTwo.flag} />{" "}
                              {match.teamTwo.name}
                            </h5>
                            {/* <abbr className="tournament-bracket__code" title={match.teamTwo.name}>{match.teamTwo.name}</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-kz" aria-label="Flag"></span> */}
                          </td>
                          <td className="tournament-bracket__score">
                            <input
                              type="number"
                              id="teamTwoScore"
                              name={
                                match.matchNumber + "/" + match.teamTwo.name
                              }
                              min="0"
                              max="7"
                              onChange={handleChange}
                            />
                            {/* <span className="tournament-bracket__number">{match.teamTwoScore}</span> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="tournament-bracket__round tournament-bracket__round--quarterfinals">
          <h3 className="tournament-bracket__round-title">Quarterfinals</h3>
          <ul className="tournament-bracket__list">
            {quarterFinals.map((match) => {
              return (
                <li className="tournament-bracket__item">
                  <div className="tournament-bracket__match" tabIndex={0}>
                    <table className="tournament-bracket__table">
                      <caption className="tournament-bracket__caption">
                        <time dateTime="1998-02-18">
                          Match {match.matchNumber}
                        </time>
                      </caption>
                      <thead className="sr-only">
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className="tournament-bracket__content">
                        <tr className="tournament-bracket__team tournament-bracket__team--winner">
                          <td className="tournament-bracket__country">
                            <h5>
                              <span className={"flag:" + match.teamOne.flag} />{" "}
                              {match.teamOne.name}
                            </h5>
                            {/* <abbr className="tournament-bracket__code" title={match.teamOne.name}>{match.teamOne.name}</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-ca" aria-label="Flag"></span> */}
                          </td>
                          <td className="tournament-bracket__score">
                            <input
                              type="number"
                              id="teamOneScore"
                              name={
                                match.matchNumber + "/" + match.teamOne.name
                              }
                              min="0"
                              max="7"
                              onChange={handleChange}
                            />
                            {/* <span className="tournament-bracket__number">{match.teamOneScore}</span> */}
                          </td>
                        </tr>
                        <tr className="tournament-bracket__team">
                          <td className="tournament-bracket__country">
                            <h5>
                              <span className={"flag:" + match.teamTwo.flag} />{" "}
                              {match.teamTwo.name}
                            </h5>
                            {/* <abbr className="tournament-bracket__code" title={match.teamTwo.name}>{match.teamTwo.name}</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-kz" aria-label="Flag"></span> */}
                          </td>
                          <td className="tournament-bracket__score">
                            <input
                              type="number"
                              id="teamTwoScore"
                              name={
                                match.matchNumber + "/" + match.teamTwo.name
                              }
                              min="0"
                              max="7"
                              onChange={handleChange}
                            />

                            {/* <span className="tournament-bracket__number">{match.teamTwoScore}</span> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="tournament-bracket__round tournament-bracket__round--quarterfinals">
          <h3 className="tournament-bracket__round-title">Semifinals</h3>
          <ul className="tournament-bracket__list">
            {semiFinals.map((match) => {
              return (
                <li className="tournament-bracket__item">
                  <div className="tournament-bracket__match" tabIndex={0}>
                    <table className="tournament-bracket__table">
                      <caption className="tournament-bracket__caption">
                        <time dateTime="1998-02-18">
                          Match {match.matchNumber}
                        </time>
                      </caption>
                      <thead className="sr-only">
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className="tournament-bracket__content">
                        <tr className="tournament-bracket__team tournament-bracket__team--winner">
                          <td className="tournament-bracket__country">
                            <h5>
                              <span className={"flag:" + match.teamOne.flag} />{" "}
                              {match.teamOne.name}
                            </h5>
                            {/* <abbr className="tournament-bracket__code" title={match.teamOne.name}>{match.teamOne.name}</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-ca" aria-label="Flag"></span> */}
                          </td>
                          <td className="tournament-bracket__score">
                            <input
                              type="number"
                              id="teamOneScore"
                              name={
                                match.matchNumber + "/" + match.teamOne.name
                              }
                              min="0"
                              max="7"
                              onChange={handleChange}
                            />

                            {/* <span className="tournament-bracket__number">{match.teamOneScore}</span> */}
                          </td>
                        </tr>
                        <tr className="tournament-bracket__team">
                          <td className="tournament-bracket__country">
                            <h5>
                              <span className={"flag:" + match.teamTwo.flag} />{" "}
                              {match.teamTwo.name}
                            </h5>
                            {/* <abbr className="tournament-bracket__code" title={match.teamTwo.name}>{match.teamTwo.name}</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-kz" aria-label="Flag"></span> */}
                          </td>
                          <td className="tournament-bracket__score">
                            <input
                              type="number"
                              id="teamTwoScore"
                              name={
                                match.matchNumber + "/" + match.teamTwo.name
                              }
                              min="0"
                              max="7"
                              onChange={handleChange}
                            />

                            {/* <span className="tournament-bracket__number">{match.teamTwoScore}</span> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="tournament-bracket__round tournament-bracket__round--gold">
          <h3 className="tournament-bracket__round-title">Final</h3>
          <ul className="tournament-bracket__list">
            {finals.map((match) => {
              return (
                <li className="tournament-bracket__item">
                  <div className="tournament-bracket__match" tabIndex={0}>
                    <table className="tournament-bracket__table">
                      <caption className="tournament-bracket__caption">
                        <time dateTime="1998-02-18">
                          Match {match.matchNumber}
                        </time>
                      </caption>
                      <thead className="sr-only">
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className="tournament-bracket__content">
                        <tr className="tournament-bracket__team tournament-bracket__team--winner">
                          <td className="tournament-bracket__country">
                            <h5>
                              <span className={"flag:" + match.teamOne.flag} />{" "}
                              {match.teamOne.name}
                            </h5>
                            {/* <abbr className="tournament-bracket__code" title={match.teamOne.name}>{match.teamOne.name}</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-ca" aria-label="Flag"></span> */}
                          </td>
                          <td className="tournament-bracket__score">
                            <input
                              type="number"
                              id="teamOneScore"
                              name={
                                match.matchNumber + "/" + match.teamOne.name
                              }
                              min="0"
                              max="7"
                              onChange={handleChange}
                            />
                            {/* <span className="tournament-bracket__number">{match.teamOneScore}</span> */}
                          </td>
                        </tr>
                        <tr className="tournament-bracket__team">
                          <td className="tournament-bracket__country">
                            <h5>
                              <span className={"flag:" + match.teamTwo.flag} />{" "}
                              {match.teamTwo.name}
                            </h5>
                            {/* <abbr className="tournament-bracket__code" title={match.teamTwo.name}>{match.teamTwo.name}</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-kz" aria-label="Flag"></span> */}
                          </td>
                          <td className="tournament-bracket__score">
                            <input
                              type="number"
                              id="teamTwoScore"
                              name={
                                match.matchNumber + "/" + match.teamTwo.name
                              }
                              min="0"
                              max="7"
                              onChange={handleChange}
                            />
                            {/* <span className="tournament-bracket__number">{match.teamTwoScore}</span> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {/* <div className="tournament-bracket__round tournament-bracket__round--gold">
        <h3 className="tournament-bracket__round-title">Gold medal game</h3>
        <ul className="tournament-bracket__list">
          <li className="tournament-bracket__item">
            <div className="tournament-bracket__match" tabIndex={0}>
              <table className="tournament-bracket__table">
                <caption className="tournament-bracket__caption">
                  <time dateTime="1998-02-22">22 February 1998</time>
                </caption>
                <thead className="sr-only">
                  <tr>
                    <th>Country</th>
                    <th>Score</th>
                  </tr>
                </thead>  
                <tbody className="tournament-bracket__content">
                  <tr className="tournament-bracket__team tournament-bracket__team--winner">
                    <td className="tournament-bracket__country">
                      <abbr className="tournament-bracket__code" title="Czech Republic">CZE</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-cz" aria-label="Flag"></span>
                    </td>
                    <td className="tournament-bracket__score">
                      <span className="tournament-bracket__number">1</span>
                      <span className="tournament-bracket__medal tournament-bracket__medal--gold fa fa-trophy" aria-label="Gold medal"></span>
                    </td>
                  </tr>
                  <tr className="tournament-bracket__team">
                    <td className="tournament-bracket__country">
                      <abbr className="tournament-bracket__code" title="Russia">RUS</abbr>
                      <span className="tournament-bracket__flag flag-icon flag-icon-ru" aria-label="Flag"></span>
                    </td>
                    <td className="tournament-bracket__score">
                      <span className="tournament-bracket__number">0</span>
                      <span className="tournament-bracket__medal tournament-bracket__medal--silver fa fa-trophy" aria-label="Silver medal"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ul>
      </div> */}
      </div>
    </div>
  );
};

export default EliminationForm;
