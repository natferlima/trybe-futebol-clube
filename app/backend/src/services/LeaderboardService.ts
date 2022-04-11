import Match from '../database/models/Match';
import { Leaderboard } from '../interfaces/leaderboard';
import ClubService from './ClubService';
import MatchService from './MatchService';

export default class LeaderboardService {
  static totalPointDraws(idClub: number, match: Match, routeType: string) {
    let points = 0;
    if (match.homeTeam === idClub && match.homeTeamGoals === match.awayTeamGoals
      && (routeType === 'home' || routeType === 'home&away')) {
      points += 1;
    }
    if (match.awayTeam === idClub && match.homeTeamGoals === match.awayTeamGoals
      && (routeType === 'away' || routeType === 'home&away')) {
      points += 1;
    }
    return points;
  }

  static totalPoints(idClub: number, allMatchs: Match[], routeType: string) {
    let points = 0;
    allMatchs.forEach(async (match) => {
      if (match.homeTeam === idClub && match.homeTeamGoals > match.awayTeamGoals
        && (routeType === 'home' || routeType === 'home&away')) {
        points += 3;
      }
      if (match.awayTeam === idClub && match.awayTeamGoals > match.homeTeamGoals
        && (routeType === 'away' || routeType === 'home&away')) {
        points += 3;
      }
      points += this.totalPointDraws(idClub, match, routeType);
    });
    return points;
  }

  static totalGames(idClub: number, allMatchs: Match[], routeType: string) {
    let result = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && (routeType === 'home' || routeType === 'home&away')) {
        result += 1;
      }
      if (match.awayTeam === idClub && (routeType === 'away' || routeType === 'home&away')) {
        result += 1;
      }
    });
    return result;
  }

  static totalVictories(idClub: number, allMatchs: Match[], routeType: string) {
    let victories = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && match.homeTeamGoals > match.awayTeamGoals
        && (routeType === 'home' || routeType === 'home&away')) {
        victories += 1;
      }
      if (match.awayTeam === idClub && match.awayTeamGoals > match.homeTeamGoals
        && (routeType === 'away' || routeType === 'home&away')) {
        victories += 1;
      }
    });
    return victories;
  }

  static totalDraws(idClub: number, allMatchs: Match[], routeType: string) {
    let draws = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && match.homeTeamGoals === match.awayTeamGoals
        && (routeType === 'home' || routeType === 'home&away')) {
        draws += 1;
      }
      if (match.awayTeam === idClub && match.homeTeamGoals === match.awayTeamGoals
        && (routeType === 'away' || routeType === 'home&away')) {
        draws += 1;
      }
    });
    return draws;
  }

  static totalLosses(idClub: number, allMatchs: Match[], routeType: string) {
    let losses = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && match.homeTeamGoals < match.awayTeamGoals
        && (routeType === 'home' || routeType === 'home&away')) {
        losses += 1;
      }
      if (match.awayTeam === idClub && match.awayTeamGoals < match.homeTeamGoals
        && (routeType === 'away' || routeType === 'home&away')) {
        losses += 1;
      }
    });
    return losses;
  }

  static goalsFavor(idClub: number, allMatchs: Match[], routeType: string) {
    let goalsFavor = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && (routeType === 'home' || routeType === 'home&away')) {
        goalsFavor += match.homeTeamGoals;
      }
      if (match.awayTeam === idClub && (routeType === 'away' || routeType === 'home&away')) {
        goalsFavor += match.awayTeamGoals;
      }
    });
    return goalsFavor;
  }

  static goalsOwn(idClub: number, allMatchs: Match[], routeType: string) {
    let goalsOwn = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && (routeType === 'home' || routeType === 'home&away')) {
        goalsOwn += match.awayTeamGoals;
      }
      if (match.awayTeam === idClub && (routeType === 'away' || routeType === 'home&away')) {
        goalsOwn += match.homeTeamGoals;
      }
    });
    return goalsOwn;
  }

  static goalsBalance(idClub: number, allMatchs: Match[], routeType: string) {
    let goalsBalance = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && (routeType === 'home' || routeType === 'home&away')) {
        goalsBalance += match.homeTeamGoals - match.awayTeamGoals; // a soma do balaço de gols de cada partida +=
      }
      if (match.awayTeam === idClub && (routeType === 'away' || routeType === 'home&away')) {
        goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
      }
    });
    return goalsBalance;
  }

  static efficiency(idClub: number, allMatchs: Match[], routeType: string) {
    const points: number = this.totalPoints(idClub, allMatchs, routeType);
    const games: number = this.totalGames(idClub, allMatchs, routeType);
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

  static async buildLeaderboard(routeType: string): Promise<Leaderboard[]> {
    const allMatchs = await MatchService.findAllInProgressOrFinished(0);
    const allClubs = await ClubService.findAll();
    const leaderboard = allClubs.map((club) => ({
      name: club.clubName,
      totalPoints: this.totalPoints(club.id, allMatchs, routeType),
      totalGames: this.totalGames(club.id, allMatchs, routeType),
      totalVictories: this.totalVictories(club.id, allMatchs, routeType),
      totalDraws: this.totalDraws(club.id, allMatchs, routeType),
      totalLosses: this.totalLosses(club.id, allMatchs, routeType),
      goalsFavor: this.goalsFavor(club.id, allMatchs, routeType),
      goalsOwn: this.goalsOwn(club.id, allMatchs, routeType),
      goalsBalance: this.goalsBalance(club.id, allMatchs, routeType),
      efficiency: this.efficiency(club.id, allMatchs, routeType),
    }));
    const sortLeaderboard = this.sortLeaderboard(leaderboard);
    return sortLeaderboard;
  }
}
