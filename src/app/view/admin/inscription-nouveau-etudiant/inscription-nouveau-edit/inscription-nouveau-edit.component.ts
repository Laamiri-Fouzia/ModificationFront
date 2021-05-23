import { Component, OnInit } from '@angular/core';
import {NoteEtudiantModuleService} from "../../../../controller/service/note-etudiant-module.service";
import {MessageService} from "primeng/api";
import {NoteEtudiantModule} from "../../../../controller/model/note-etudiant-module.model";
import {InscriptionEtudiantService} from "../../../../controller/service/inscription-etudiant.service";
import {EtudiantOption} from "../../../../controller/model/etudiant-option.model";

@Component({
  selector: 'app-inscription-nouveau-edit',
  templateUrl: './inscription-nouveau-edit.component.html',
  styleUrls: ['./inscription-nouveau-edit.component.scss']
})
export class InscriptionNouveauEditComponent implements OnInit {

  constructor(private inscriptionEtudiantService:InscriptionEtudiantService ,private messageService: MessageService) { }

  ngOnInit(): void {
  }
  get editDialog(): boolean {
    return this.inscriptionEtudiantService.editDialog;
  }

  set editDialog(value: boolean) {
    this.inscriptionEtudiantService.editDialog = value;
  }


  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.etudiantOptions.length; i++) {
      if (this.etudiantOptions[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  EditStudent() {
    if (this.etudiantOption.id) {
      this.etudiantOptions[this.findIndexById(this.etudiantOption.id)] = this.etudiantOption;
    }
    this.inscriptionEtudiantService.EditStudent();
    this.hideEditDialog();
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'la modification est effectuée ',
      life: 3000
    });

  }

  public hideEditDialog() {
    this.editDialog = false;
  }
  get etudiantOption(): EtudiantOption {
    return this.inscriptionEtudiantService.etudiantOption;
  }

  get etudiantOptions(): Array<EtudiantOption> {
    return this.inscriptionEtudiantService.etudiantOptions;
  }

  set etudiantOption(value: EtudiantOption) {
    this.inscriptionEtudiantService.etudiantOption = value;
  }

}
