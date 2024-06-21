import { Component } from '@angular/core';
import { FanService } from '../../../tools/services/fan.service';
import { Fan } from '../../../tools/models/fan';
import { Router } from '@angular/router';

@Component({
    selector: 'app-get-fans',
    templateUrl: './get-fans.component.html',
    styleUrl: './get-fans.component.scss',
})
export class GetFansComponent {
    fans: Fan[] = [];

    constructor(private fanService: FanService, private router: Router) {}

    ngOnInit() {
        this.fans = this.fanService.getFans();
    }

    updateFan(fan: Fan) {
        this.router.navigateByUrl(`/fan/update/${fan.id}`);
    }

    getFan(fan: Fan) {
        this.router.navigateByUrl(`/fan/${fan.id}`);
    }

    deleteFan(fan: Fan) {
        this.fanService.removeFan(fan.id);
        this.router.navigateByUrl(`/fan/fans`);
    }
}
