import { Component } from '@angular/core';
import { FanService } from '../../../tools/services/fan.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minimumAgeValidator } from '../../../tools/validators/date_validator_min_age.validator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-fan',
    templateUrl: './create-fan.component.html',
    styleUrl: './create-fan.component.scss',
})
export class CreateFanComponent {
    formulaire: FormGroup;

    constructor(
        private fanService: FanService,
        private formBuilder: FormBuilder,
        private router : Router
    ) {
        this.formulaire = this.formBuilder.group({
            nom: ['', [Validators.required]],
            date_de_naissance: ['', [Validators.required, minimumAgeValidator(13)]],
            series: this.formBuilder.array(
                [this.createSerie()],
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

    onSubmit() {
        if (this.formulaire.valid) {
            const series = this.formulaire.value.series.map((serie: any) => serie.name);
            let fan = this.formulaire.value;
            fan.series = series;
            this.fanService.addFan(fan);
            this.router.navigate(['/fan/fans']);
        }
    }
}
