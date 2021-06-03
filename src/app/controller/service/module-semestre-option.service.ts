import {Injectable} from '@angular/core';
import {ModuleSemestreOption} from "../model/module-semestre-option.model";
import {HttpClient} from "@angular/common/http";
import {MyOption} from "../model/my-option.model";
import {Semestre} from "../model/semestre.model";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";
import {Seance} from "../model/seance.model";


@Injectable({
    providedIn: 'root'
})
export class ModuleSemestreOptionService {
    private URLmoduleSemOpt = 'ispits-project/module-semestre-option/';
    private urlBase = 'http://localhost:8036/';//http://localhost:8036/ispits-project/module-semestre-option/
    private _moduleSemestreOption: ModuleSemestreOption;

    constructor(private http: HttpClient, private messageService: MessageService) {
    }


    set displayModules(value: boolean) {
        this._displayModules = value;
    }
    get moduleSemestreOption(): ModuleSemestreOption {
        if (this._moduleSemestreOption == null)
            this._moduleSemestreOption = new ModuleSemestreOption();
        return this._moduleSemestreOption;
    }

    set moduleSemestreOption(value: ModuleSemestreOption) {
        this._moduleSemestreOption = value;
    }

    private _moduleSemestreOptions: Array<ModuleSemestreOption>;

    get moduleSemestreOptions(): Array<ModuleSemestreOption> {
        if (this._moduleSemestreOptions == null)
            this._moduleSemestreOptions = new Array<ModuleSemestreOption>();
        return this._moduleSemestreOptions;
    }

    set moduleSemestreOptions(value: Array<ModuleSemestreOption>) {
        this._moduleSemestreOptions = value;
    }

    private _semesters: Array<Semestre>;

    get semesters(): Array<Semestre> {
        if (this._semesters == null)
            this._semesters = new Array<Semestre>();
        return this._semesters;
    }

    set semesters(value: Array<Semestre>) {
        this._semesters = value;
    }

    private _displayModules: boolean = false;

    get displayModules(): boolean {
        return this._displayModules;
    }

    private _anneUniveSelec: number;

    get anneUniveSelec(): number {
        return this._anneUniveSelec;
    }

    set anneUniveSelec(value: number) {
        this._anneUniveSelec = value;
    }

    private _OptionSelec = '';

    get OptionSelec(): string {
        return this._OptionSelec;
    }

    set OptionSelec(value: string) {
        this._OptionSelec = value;
    }

    private _semestreselec: number;

    get semestreselec(): number {
        return this._semestreselec;
    }

    set semestreselec(value: number) {
        this._semestreselec = value;
    }

    private _createDialog: boolean;

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    private _editDialog: boolean;

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    private _viewDialog: boolean;

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }

    private _submitted: boolean;

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    private _typeSelec = '';

    get typeSelec(): string {
        return this._typeSelec;
    }


    //detaill Ta3 option

    set typeSelec(value: string) {
        this._typeSelec = value;
    }

    private _moduleSelec = '';

    get moduleSelec(): string {
        return this._moduleSelec;
    }

    set moduleSelec(value: string) {
        this._moduleSelec = value;
    }

    /*findByOptionCode() {
        let urlFind = 'semestre/code/' + this.semestreselec + '/anneeuniv/' + this.anneUniveSelec + '/option/code/' + this.moduleSemestreOption.myOption.code;

        this.http.get<Array<ModuleSemestreOption>>(this.urlBase + this.URLmoduleSemOpt + urlFind).subscribe(
            data => {
                this.moduleSemestreOptions = data;
            }, error => {
                console.log(error);
            }
        );
    }*/
    findByOptionCode() {
        let urlFind='semestre/code/'+this.semestreselec+'/anneeuniv/anneeOne/'+this.anneUniveSelec+'/option/code/'+this.moduleSemestreOption.myOption.code;
        this.http.get<Array<ModuleSemestreOption>>(this.urlBase + this.URLmoduleSemOpt +urlFind).subscribe(
            data => {
                this.moduleSemestreOptions = data;
            }, error => {
                console.log(error);
            }
        );
    }

    saveOptionSemestreModule(moduleselect: string, typemoduleselect: string) {
        this.submitted = true;
        this.moduleSemestreOption.code = this.moduleSemestreOption.myOption.code + moduleselect + this.semestreselec;
        this.moduleSemestreOption.myModule.code = moduleselect;
        this.moduleSemestreOption.typeModule.code = typemoduleselect;
        this.moduleSemestreOption.semestre.code = this.semestreselec;
        this.moduleSemestreOption.anneeUniversitaire.anneeOne=this.anneUniveSelec;
        console.log('save d service ');
        console.log(this.moduleSemestreOption);

        if (this.moduleSemestreOption.code.trim()) {
            this.http.post<number>(this.urlBase + this.URLmoduleSemOpt, this.moduleSemestreOption).subscribe(
                data => {
                    this.moduleSemestreOptions.push(this.cloneModuleSemestreOption(this.moduleSemestreOption));
                    this.moduleSemestreOption=null;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'le module est ajouter',
                        life: 3000
                    });
                },error => {
                    console.log(error);
                    this.moduleSemestreOption=new ModuleSemestreOption();
                }
                );
            this.createDialog = false;

        }
    }

    public cloneModuleSemestreOption(mos: ModuleSemestreOption) {
        let moduleSemestreOption: ModuleSemestreOption = new ModuleSemestreOption();
        moduleSemestreOption.code = mos.code;
        moduleSemestreOption.anneeUniversitaire = mos.anneeUniversitaire;
        moduleSemestreOption.semestre = {...mos.semestre};
        moduleSemestreOption.myOption = {...mos.myOption};
        moduleSemestreOption.myModule = {...mos.myModule};
        moduleSemestreOption.typeModule = {...mos.typeModule};
        return moduleSemestreOption;
    }

    choisirParam(myOption: MyOption) {
        this.moduleSemestreOption.myOption.code = myOption.code;
    }


    public deleteModuleSemestreOption(): Observable<number> {
        alert(this.urlBase + this.URLmoduleSemOpt + 'code/' + this.moduleSemestreOption.code);
        return this.http.delete<number>(this.urlBase + this.URLmoduleSemOpt + 'code/' + this.moduleSemestreOption.code);
    }


}