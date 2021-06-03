import { Injectable } from '@angular/core';
import {NoteEtudiantModule} from "../model/note-etudiant-module.model";
import {HttpClient} from "@angular/common/http";
import * as XLSX from "xlsx";

@Injectable({
  providedIn: 'root'
})
export class NoteEtudiantModuleService {
  private urlBase='http://localhost:8036/';
    private _editDialog: boolean;
    private _noteEtudiantModule:NoteEtudiantModule;
  private _notesEtudiantModule:Array<NoteEtudiantModule>;
  private _notesEtudiantRat:Array<NoteEtudiantModule>;
  private URLNoteEtudModule: string='ispits-project/note-etudiant-modul';
  private moduleselected: string;
    private moduleRatt: string;

  constructor(private http:HttpClient) { }

  serachEtudiant(module:string) {
      this.moduleselected=module;
      this.http.get<Array<NoteEtudiantModule>>(this.urlBase + this.URLNoteEtudModule+'/module-semestre-option/codeModule/'+module).subscribe(
      data => {
        this.notesEtudiantModule = data;
      }, error => {
        console.log(error);
      }
    );
  }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }
  get noteEtudiantModule(): NoteEtudiantModule {
    if(this._noteEtudiantModule==null)
      this._noteEtudiantModule=new NoteEtudiantModule();
    return this._noteEtudiantModule;
  }

  set noteEtudiantModule(value: NoteEtudiantModule) {
    this._noteEtudiantModule = value;
  }

  get notesEtudiantModule(): Array<NoteEtudiantModule> {
    if(this._notesEtudiantModule==null)
      this._notesEtudiantModule=new Array<NoteEtudiantModule>();
    return this._notesEtudiantModule;
  }

  set notesEtudiantModule(value: Array<NoteEtudiantModule>) {
    this._notesEtudiantModule = value;
  }

  get notesEtudiantRat(): Array<NoteEtudiantModule> {
    if(this._notesEtudiantRat==null)
      this._notesEtudiantRat=new Array<NoteEtudiantModule>();
    return this._notesEtudiantRat;
  }

  set notesEtudiantRat(value: Array<NoteEtudiantModule>) {
    this._notesEtudiantRat = value;
  }

  EditNote() {
     let pc=0.75;
     let pf=0.25;
     let nc=this.noteEtudiantModule.noteContinue;
     let nfAvR=this.noteEtudiantModule.noteFinalAvRat;
     this.noteEtudiantModule.noteModuleNormal=(pc*nc)+(pf*nfAvR);
     this.noteEtudiantModule.noteGlobale=this.noteEtudiantModule.noteModuleNormal;
     this.noteEtudiantModule.moduleSemestreOption.code=this.moduleselected;
     if(this.noteEtudiantModule.noteModuleNormal>=10)
       this.noteEtudiantModule.etatValidation.libelle='Validé';
     else
       this.noteEtudiantModule.etatValidation.libelle='Rattrapage';
     console.log('serv')
     console.log(this.noteEtudiantModule);
     this.http.put(this.urlBase+this.URLNoteEtudModule+'/',this.noteEtudiantModule).subscribe(
       data => {
           console.log('hnna noteEtudiantModule mli 3yetnna 3lihha');
           console.log(this.noteEtudiantModule);
           console.log('hnna data');
            console.log(data)
       }, error => {
         console.log(error);
       }
     );

  }

    listeRatt(module: string){
        this.moduleRatt=module;
        this.http.get<Array<NoteEtudiantModule>>(this.urlBase + this.URLNoteEtudModule+'/moduleSemestreOption/codeModule/'+module+'/etatValidation/codeEtat/R').subscribe(
            data => {
                console.log(data)
                this.notesEtudiantRat = data;
                console.log(this.notesEtudiantRat)
            }, error => {
                console.log(error);
            }
        );
  }


  EditNoteRat() {
    let pc=0.75;
    let pf=0.25;
    let nc=this.noteEtudiantModule.noteContinue;
    let nfApresR=this.noteEtudiantModule.noteFinalApresRat;
    this.noteEtudiantModule.noteModuleRat=(pc*nc)+(pf*nfApresR);
    this.noteEtudiantModule.moduleSemestreOption.code=this.moduleRatt;

      if(this.noteEtudiantModule.noteModuleRat>this.noteEtudiantModule.noteModuleNormal)
        this.noteEtudiantModule.noteGlobale=this.noteEtudiantModule.noteModuleRat;

    if(this.noteEtudiantModule.noteGlobale<10)
      this.noteEtudiantModule.etatValidation.libelle='Non Validé';
    else
      this.noteEtudiantModule.etatValidation.libelle='V aprés Rattrapage';

    console.log(this.noteEtudiantModule);
    this.http.put(this.urlBase+this.URLNoteEtudModule+'/',this.noteEtudiantModule).subscribe(
      data => {
        console.log(data)
      }, error => {
        console.log(error);
      }
    );
  }

    public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
        // bax i9rah
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        // 3la l first sheet
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /*save data en va le supprimer apres*/
        const data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        return data;
    }

}