import Match from '../database/models/Match';
import { Leaderboard } from '../interfaces/leaderboard';
import ClubService from './ClubService';
import MatchService from './MatchService';

export default class LeaderboardService {
  static async totalPoints(idClub: number, allMatchs: Match[], routeType: string) {
    let points = 0;
    allMatchs.forEach((match) => {
      if (match.homeTeam === idClub && match.homeTeamGoals > match.awayTeamGoals
        && (routeType === 'home' || routeType === 'home&away')) {
        points += 3;
      }
      if (match.awayTeam === idClub && match.awayTeamGoals > match.homeTeamGoals
        && (routeType === 'away' || routeType === 'home&away')) {
        points += 3;
      }
      if ((match.homeTeam === idClub || match.awayTeam === idClub)
      && match.homeTeamGoals === match.awayTeamGoals) {
        points += 1;
      }
    });
    return points;
  }

  static async totalGames(idClub: number, allMatchs: Match[], routeType: string) {
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

  static async totalVictories(idClub: number, allMatchs: Match[], routeType: string) {
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

  static async totalDraws(idClub: number, allMatchs: Match[], routeType: string) {
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

  static async totalLosses(idClub: number, allMatchs: Match[], routeType: string) {
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

  static async goalsFavor(idClub: number, allMatchs: Match[], routeType: string) {
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

  static async goalsOwn(idClub: number, allMatchs: Match[], routeType: string) {
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

  static async goalsBalance(idClub: number, allMatchs: Match[], routeType: string) {
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

  static async efficiency(idClub: number, allMatchs: Match[], routeType: string) {
    const points: number = await this.totalPoints(idClub, allMatchs, routeType);
    const games: number = await this.totalGames(idClub, allMatchs, routeType);
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
    const leaderboard = await Promise.all(allClubs.map(async (club) => ({
      name: club.clubName,
      totalPoints: await this.totalPoints(club.id, allMatchs, routeType),
      totalGames: await this.totalGames(club.id, allMatchs, routeType),
      totalVictories: await this.totalVictories(club.id, allMatchs, routeType),
      totalDraws: await this.totalDraws(club.id, allMatchs, routeType),
      totalLosses: await this.totalLosses(club.id, allMatchs, routeType),
      goalsFavor: await this.goalsFavor(club.id, allMatchs, routeType),
      goalsOwn: await this.goalsOwn(club.id, allMatchs, routeType),
      goalsBalance: await this.goalsBalance(club.id, allMatchs, routeType),
      efficiency: await this.efficiency(club.id, allMatchs, routeType),
    })));
    const sortLeaderboard = await this.sortLeaderboard(leaderboard);
    return sortLeaderboard;
  }
}
