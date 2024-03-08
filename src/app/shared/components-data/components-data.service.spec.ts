import { TestBed } from '@angular/core/testing';

import { ComponentsDataService } from './components-data.service';

describe('ComponentsDataService', () => {
    let service: ComponentsDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ComponentsDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
