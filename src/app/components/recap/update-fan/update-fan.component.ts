import { Component } from '@angular/core';
import { Fan } from '../../../tools/models/fan';
import { FanService } from '../../../tools/services/fan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minimumAgeValidator } from '../../../tools/validators/date_validator_min_age.validator';

@Component({
    selector: 'app-update-fan',
    templateUrl: './update-fan.component.html',
    styleUrl: './update-fan.component.scss',
})
export class UpdateFanComponent {
    formulaire: FormGroup;
    fan: Fan | undefined = new Fan();
    id: number = 0;

    constructor(
        private fanService: FanService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router : Router
    ) {
        this.formulaire = this.formBuilder.group({
            nom: ['', [Validators.required]],
            date_de_naissance: [
                '',
                [Validators.required, minimumAgeValidator(13)],
            ],
            series: this.formBuilder.array(
                [],
                [Validators.required]
            ),
        });
    }

    get series(): FormArray {
        return this.formulaire.get('series') as FormArray;
    }

    createSerie(): FormGroup {
        return this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    addSerie() {
        this.series.push(this.createSerie());
    }

    removeSerie(index: number) {
        this.series.removeAt(index);
    }

    ngOnInit() {
        this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
        this.fan = this.fanService.getFan(this.id);

        this.formulaire.patchValue({
            nom: this.fan?.nom,
            date_de_naissance: this.fan?.date_de_naissance,
            series: this.fan?.series.forEach((serie) => {
                if (serie)
                    this.series.push(this.formBuilder.group({ name: serie }));
            })
        });
    }

    onSubmit() {
        if (this.formulaire.valid) {
            const series = this.formulaire.value.series.map(
                (serie: any) => serie.name
            );
            let fan = this.formulaire.value;
            fan.series = series;
            fan.id = this.id;
            this.fanService.updateFan(this.id, fan as Fan);
        }

        this.router.navigate(['/fan/fans']);
    }
}
