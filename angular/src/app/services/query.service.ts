import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SearchResults } from "../model/search-results";
import { DatePipe } from "@angular/common";
import { PatentModel } from "../model/patent-model";
import { environment } from "../../environments/environment";
import { InternalError } from "../model/internal-error";


/**
 * Service to query the search endpoint
 */
@Injectable({
  providedIn: 'root'
})
export class QueryService {
    searchResults: SearchResults = new SearchResults();
    PATENT_SEARCH_API: string = environment.PATENT_SEARCH_API;
    currentQuery: String | undefined = "";
    internalError: InternalError = new InternalError()

    constructor(private httpClient: HttpClient, private datePipe: DatePipe) { }

    /**
     * This method is set to provide search results from backend, providing a query that would be used by it to request the EPO API
     * @param keywordsQuery
     * @param applicant
     * @param publicationDateStart
     * @param publicationDateEnd
     */
    queryData(keywordsQuery: any, applicant: any, publicationDateStart: Date, publicationDateEnd: Date) {
        let publicationDateStartFormated: string | null = "";
        let publicationDateEndFormated: string | null = "";
        let applicantQuery: String | undefined = undefined;
        let periodQuery: String | undefined = undefined;
        let query: String | undefined = "";
        // We reset the searchResults
        this.searchResults.setResults([]);
        // We reset the currentQuery
        this.currentQuery = "";
        // Prepare applicant query
        if (applicant != "") {
          applicantQuery = "pa=" + applicant;
        }
        // Prepare period query
        if (publicationDateStart != undefined && publicationDateEnd != undefined) {
            publicationDateStartFormated = this.datePipe.transform(publicationDateStart, 'yyyyMMdd');
            publicationDateEndFormated = this.datePipe.transform(publicationDateEnd, 'yyyyMMdd');
            periodQuery = "pd=" + "\"" + publicationDateStartFormated + " " + publicationDateEndFormated + "\"";
        }
        // Prepare the query depending on the existence of the parameters.
        // For this first one, we have all parameters.
        if (keywordsQuery != "" && applicantQuery != undefined && periodQuery != undefined) {
            query = keywordsQuery + "," + applicantQuery + "," + periodQuery;
        // In this case, we have keywords and period
        } else if (keywordsQuery != "" && applicantQuery == undefined && periodQuery != undefined) {
            query = keywordsQuery + "," + periodQuery;
        // In this one, we have keywords and applicant name
        } else if (keywordsQuery != "" && applicantQuery != undefined && periodQuery == undefined) {
            query = keywordsQuery + "," + applicantQuery;
        // In this case, we have only keywords
        } else if (keywordsQuery != "" && applicantQuery == undefined && periodQuery == undefined) {
            query = keywordsQuery;
        // In this case, we have only applicant name
        } else if (keywordsQuery == "" && applicantQuery != undefined && periodQuery == undefined) {
            query = applicantQuery;
        // Here, we only have a period
        } else if (keywordsQuery == "" && applicantQuery == undefined && periodQuery != undefined) {
            query = periodQuery;
        // In this case, we have an applicant name and a period
        } else if (keywordsQuery == "" && applicantQuery != undefined && periodQuery != undefined) {
            query = applicantQuery + "," + periodQuery;
        }
        // We keep the query as the current one
        this.currentQuery = query;
        // We request the back with the builded query
        let searchRequestUrl: string = this.PATENT_SEARCH_API + query + "/1";
        this.httpClient.get<PatentModel[]>(searchRequestUrl).subscribe({
            next: (patents) => {
                // We set the results on searchResults
                this.searchResults.setResults(patents);
                this.internalError.internalError = false;
            }, error: (err) => {
              console.error(err)
              this.internalError.internalError = true;
            }
        })
    }

    /**
     * Method to query next result page
     * @param page
     */
    queryNextPage(page: number) {
        // Set the page number
        let nextPageNumber: string = "/" + page;
        // Reset searchResults
        this.searchResults.setResults([]);
        // Request back with the current query
        let searchRequestUrl: string = this.PATENT_SEARCH_API + this.currentQuery + nextPageNumber;
        this.httpClient.get<PatentModel[]>(searchRequestUrl).subscribe({
            next: (patents) => {
                // Set the results on searchResults
                this.searchResults.setResults(patents);
            },
            error: (err) => console.error(err)
        })
    }
}
