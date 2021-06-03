import { Component, OnInit } from '@angular/core';
import {InscriptionEtudiantService} from "../../../../controller/service/inscription-etudiant.service";
import {EtudiantOption} from "../../../../controller/model/etudiant-option.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-inscription-nouveau-create',
  templateUrl: './inscription-nouveau-create.component.html',
  styleUrls: ['./inscription-nouveau-create.component.scss']
})
export class InscriptionNouveauCreateComponent implements OnInit {

  constructor(private inscriptionEtudiantService:InscriptionEtudiantService,private messageService: MessageService) { }
   date:Date;
  ngOnInit(): void {
  }
  get createDialog(): boolean {
    return this.inscriptionEtudiantService.createDialog;
  }

  set createDialog(value: boolean) {
    this.inscriptionEtudiantService.createDialog = value;
  }

  get etudiantOption(): EtudiantOption {
    return this.inscriptionEtudiantService.etudiantOption;
  }

  public hideCreateDialog() {
    this.inscriptionEtudiantService.etudiantOption=null;
    this.createDialog = false;
  }

  saveNewEtudiant() {
     this.inscriptionEtudiantService. saveNewEtudiant();
     this.createDialog = false;
  }


    addDate() {
      this.etudiantOption.etudiant.dateNaissance.setDate((this.date.getDate()));
      this.etudiantOption.etudiant.dateNaissance.setMonth(this.date.getMonth());
      this.etudiantOption.etudiant.dateNaissance.setFullYear(this.date.getFullYear());
      console.log(this.date);
      console.log(this.etudiantOption.etudiant.dateNaissance);
    }
}