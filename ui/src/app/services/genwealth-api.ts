import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { BASE_URL } from '../app.config';

export interface Investment {
    id?: number;
    name?: string;
    description?: string;
    risk_level?: string;
    return_rate?: number;
}

export interface Prospect {
    id?: number;
    name?: string;
    email?: string;
    phone_number?: string;
    risk_profile?: string;
    age?: number;
}

export interface GenWealthService {
    searchInvestments(terms: string[]): Observable<Investment[]>;
    semanticSearchInvestments(prompt: string): Observable<Investment[]>;
    semanticSearchProspects(
        prompt: string,
        riskProfile?: string,
        minAge?: number,
        maxAge?: number): Observable<Prospect[]>;
    chat(prompt: string, userId?: number): Observable<string>; //llm_response
}



@Injectable({
    providedIn: 'root'
})
export class GenWealthServiceClient implements GenWealthService {
    constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {}
    
    searchInvestments(terms: string[]): Observable<Investment[]> {
        return this.http.get<Investment[]>(`${this.baseUrl}/investments`, {
            params: { terms: terms }
        });
    }

    semanticSearchInvestments(prompt: string): Observable<Investment[]> {
        return this.http.get<Investment[]>(`${this.baseUrl}/investments/semantic-search`, {
            params: { prompt: prompt }
        });
    }

    semanticSearchProspects(prompt: string, riskProfile?: string | undefined, minAge?: number | undefined, maxAge?: number | undefined): Observable<Prospect[]> {
        let params: HttpParams = new HttpParams().set('prompt', prompt);
        
        if (riskProfile) {
            params = params.set('risk_profile', riskProfile);
        }
        if (minAge) {
            params = params.set('min_age', minAge);
        }
        if (maxAge) {
            params = params.set('max_age', maxAge);
        }

        return this.http.get<Prospect[]>(`${this.baseUrl}/prospects/search`, {params: params});
    }

    chat(prompt: string, userId?: number | undefined): Observable<string> {
        let params: HttpParams = new HttpParams().set('prompt', prompt);
        
        if (userId) {
            params = params.set('user_id', userId);
        }
        
        return this.http.get<any>(`${this.baseUrl}/chat`, { params: params }).pipe(
            map(response => (response.llm_response ?? '') as string),
            tap(r => console.log('response', r))
        );
    }
}
