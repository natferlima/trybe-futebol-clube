import Match from '../database/models/Match';
import { Leaderboard } from '../interfaces/leaderboard';
import ClubService from './ClubService';
import MatchService from './MatchService';

export default class LeaderboardService {
  static async totalPoints(idClub: number, allMatchs: Match[]) {
    let points = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && match.homeTeamGoals > match.awayTeamGoals) {
        points += 3;
      }
      if (match.awayTeam === idClub && match.awayTeamGoals > match.homeTeamGoals) {
        points += 3;
      }
      if ((match.homeTeam === idClub || match.awayTeam === idClub)
      && match.homeTeamGoals === match.awayTeamGoals) {
        points += 1;
      }
    });
    return points;
  }

  static async totalGames(idClub: number, allMatchs: Match[]) {
    let result = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub) {
        result += 1;
      }
      if (match.awayTeam === idClub) {
        result += 1;
      }
    });
    return result;
  }

  static async totalVictories(idClub: number, allMatchs: Match[]) {
    let victories = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && match.homeTeamGoals > match.awayTeamGoals) {
        victories += 1;
      }
      if (match.awayTeam === idClub && match.awayTeamGoals > match.homeTeamGoals) {
        victories += 1;
      }
    });
    return victories;
  }

  static async totalDraws(idClub: number, allMatchs: Match[]) {
    let draws = 0;
    allMatchs.forEach((match) => {
      if ((match.homeTeam === idClub || match.awayTeam === idClub)
      && match.homeTeamGoals === match.awayTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  }

  static async totalLosses(idClub: number, allMatchs: Match[]) {
    let losses = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && match.homeTeamGoals < match.awayTeamGoals) {
        losses += 1;
      }
      if (match.awayTeam === idClub && match.awayTeamGoals < match.homeTeamGoals) {
        losses += 1;
      }
    });
    return losses;
  }

  static async goalsFavor(idClub: number, allMatchs: Match[]) {
    let goalsFavor = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub) {
        goalsFavor += match.homeTeamGoals;
      }
      if (match.awayTeam === idClub) {
        goalsFavor += match.awayTeamGoals;
      }
    });
    return goalsFavor;
  }

  static async goalsOwn(idClub: number, allMatchs: Match[]) {
    let goalsOwn = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub) {
        goalsOwn += match.awayTeamGoals;
      }
      if (match.awayTeam === idClub) {
        goalsOwn += match.homeTeamGoals;
      }
    });
    return goalsOwn;
  }

  static async goalsBalance(idClub: number, allMatchs: Match[]) {
    let goalsBalance = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub) {
        goalsBalance += match.homeTeamGoals - match.awayTeamGoals; // a soma do balaço de gols de cada partida +=
      }
      if (match.awayTeam === idClub) {
        goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
      }
    });
    return goalsBalance;
  }

  static async efficiency(idClub: number, allMatchs: Match[]) {
    const points: number = await this.totalPoints(idClub, allMatchs);
    const games: number = await this.totalGames(idClub, allMatchs);
    const efficiency = ((points / (games * 3)) * 100).toFixed(2);
    return Number(efficiency);
  }

  static async sortLeaderboard(leaderboard: Leaderboard[]) {
    const result = leaderboard.sort((a: Leaderboard, b: Leaderboard) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints; // b-a para ordenar decrescente
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
      // a deve ser igual a b
      return 0;
    });
    return result;
  }

  static async buildLeaderboard(): Promise<Leaderboard[]> {
    const allMatchs = await MatchService.findAllInProgressOrFinished(0);
    const allClubs = await ClubService.findAll();
    const leaderboard = await Promise.all(allClubs.map(async (club) => ({
      name: club.clubName,
      totalPoints: await this.totalPoints(club.id, allMatchs),
      totalGames: await this.totalGames(club.id, allMatchs),
      totalVictories: await this.totalVictories(club.id, allMatchs),
      totalDraws: await this.totalDraws(club.id, allMatchs),
      totalLosses: await this.totalLosses(club.id, allMatchs),
      goalsFavor: await this.goalsFavor(club.id, allMatchs),
      goalsOwn: await this.goalsOwn(club.id, allMatchs),
      goalsBalance: await this.goalsBalance(club.id, allMatchs),
      efficiency: await this.efficiency(club.id, allMatchs),
    })));
    const sortLeaderboard = await this.sortLeaderboard(leaderboard);
    return sortLeaderboard;
  }
}
