import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { BASE_URL } from '../app.config';

export interface Investment {
    ticker?: string;
    etf?: boolean;
    rating?: string;
    analysis?: string;
    distance?: number;
}

export interface Prospect {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number,
    risk_profile?: string;
    bio?: string,
    distance?: number;
}

export interface ChatResponse {
    llmPrompt?: string;
    llmResponse?: string;
}

export interface GenWealthService {
    searchInvestments(terms: string[]): Observable<Investment[]>;
    semanticSearchInvestments(prompt: string): Observable<Investment[]>;
    semanticSearchProspects(
        prompt: string,
        riskProfile?: string,
        minAge?: number,
        maxAge?: number): Observable<Prospect[]>;
    chat(prompt: string, userId?: number): Observable<ChatResponse>; 
}

@Injectable({
    providedIn: 'root'
})
export class GenWealthServiceClient implements GenWealthService {
    constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {}
    
    searchInvestments(terms: string[]): Observable<Investment[]> {
        return this.http.get<Investment[]>(`${this.baseUrl}/investments/search`, {
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

    chat(prompt: string, userId?: number | undefined): Observable<ChatResponse> {
        let params: HttpParams = new HttpParams().set('prompt', prompt);
        
        if (userId) {
            params = params.set('user_id', userId);
        }
        
        return this.http.get<ChatResponse>(`${this.baseUrl}/chat`, { params: params })
        .pipe(tap(response => 
            console.log('Chat response:', response)
            ));
        
    }
}
