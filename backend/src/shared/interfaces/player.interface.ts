import jobList from "../enums/jobs.enums";
import groupList from "../enums/group.enum";
import { Prisma, users } from "@prisma/client";

export interface Accounts {
  // حساب بانکی
  money: number;
  bank: number;
  salary: number;
  black_money: number;
  tether: number;
}

interface PlayerStatus {
  val: number;
  percent: number;
  name: string;
}

interface PlayerMedicStatus {
  health: number;
  armor: number;
}

export class Player {
  id: number;
  identifier: string;
  firstname: string;
  lastname: string;

  accounts: Accounts;
  group: string;

  medState: string;
  job: string;
  job_grade: number;
  phone_number: string;

  faction: number;
  divisions: string;
  gang: string;
  gang_grade: number;
  gangMembers?: string;
  loadout: string;

  status: PlayerStatus;
  vipTime: Date;

  constructor(player: users) {
    this.id = player.id;
    this.identifier = player.identifier;
    this.firstname = player.firstname;
    this.lastname = player.lastname;
    this.phone_number = player.phone_number;
    this.group = player.group;
    this.medState = player.medState;
    this.job = player.job;
    this.gang = player.gang;
    this.vipTime = player.viptime;
    try {
      this.accounts = JSON.parse(player.accounts);
    } catch {
      this.accounts = {
        bank: 0,
        tether: 0,
        black_money: 0,
        money: 0,
        salary: 0,
      };
    }
  }

  //
  // getFullName(): string {
  //   return this.accounts;
  // }

  // getAccounts(): Accounts {
  //   if (this.accounts) {
  //     return JSON.parse(this.accounts);
  //   } else {
  //     return { bank: 0, tether: 0, black_money: 0, money: 0, salary: 0 };
  //   }
  // }
  //
  // private getJob(jobName: string): string {
  //   const job_ = jobList.find((job) => job.name == jobName);
  //   if (job_) return JSON.stringify(job_);
  //
  //   const bikar = jobList.find((job) => job.name == "unemployed");
  //   if (bikar) return JSON.stringify(bikar);
  //   else throw new Error("Unemployed");
  // }
  //
  // getGroup(): any {
  //   try {
  //     const name = this.group;
  //     let group = groupList.find((group) => group.name == name);
  //     if (!group) {
  //       group = groupList.find((group) => group.name == "unemployed");
  //     }
  //     return group;
  //   } catch (error) {
  //     return groupList.find((group) => group.name == "unemployed");
  //   }
  // }
  //
  // isVip(): Boolean {
  //   if (this.viptime) {
  //     const date = new Date();
  //     const viptime = new Date(this.viptime);
  //     if (date < viptime) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }
}
