import { Injectable } from '@angular/core';
import { Fan } from '../models/fan';

@Injectable({
    providedIn: 'root',
})
export class FanService {
    private fans: Fan[] = [];
    private id: number = 0;
    private connecte: boolean = false;

    constructor() {}

    getFans(): Fan[] {
        return this.fans;
    }

    getFan(id: number): Fan | undefined {
        return this.fans.find((fan) => fan.id === id);
    }

    addFan(fan: Fan) {
        fan.id = this.id++;
        this.fans.push(fan);
    }

    login(username: string, password: string): boolean {
        if (username === 'brian' && password === 'password') {
            this.connecte = true;
            return true;
        }
        return false;
    }

    updateFan(id: number, fan: Fan) {
        const index = this.fans.findIndex((f) => f.id === id);
        if (index !== -1) {
            this.fans[index] = fan;
        }
    }

    removeFan(id: number) {
        const index = this.fans.findIndex((f) => f.id === id);
        if (index !== -1) {
            this.fans.splice(index, 1);
        }
    }

    logout(): void {
        this.connecte = false;
    }

    estConnecte(): boolean {
        return this.connecte;
    }
}
