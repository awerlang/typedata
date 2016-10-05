import { } from 'mocha';
import { expect } from 'chai';
import { List } from '../src/index';
import { Listable } from '../src/index';
import { ListableElement } from '../src/index';

describe('List', () => {

    it('should accept elements in constructor', () => {
        let values = [new Listable(1), new Listable(2), new Listable(3)];
        let list = new List<Listable<number>>(...values);
        expect(list.elements).deep.eq(values);
    });

    it('should push an element in the front of the list', () => {
        let values = [new Listable(10), new Listable(20), new Listable(30)];
        let list = new List<Listable<number>>(...values);
        list.pushFront(new Listable(40));
        expect(list.elements).deep.eq([new Listable(40), ...values]);
    });

    it('should push an element in the back of the list', () => {
        let values = [new Listable(10), new Listable(20), new Listable(30)];
        let list = new List<Listable<number>>(...values);
        list.pushBack(new Listable(40));
        expect(list.elements).deep.eq([...values, new Listable(40)]);
    });

    it('should return the length of the list', () => {
        let list = new List<Listable<number>>(new Listable(1), new Listable(2));
        expect(list.length).eq(2);
        list.pushBack(new Listable(3));
        expect(list.length).eq(3);
    });

    it('should return the last element', () => {
        let list = new List<Listable<number>>();
        expect(list.last).eq(undefined);
        let elem1 = new Listable(1);
        list.pushBack(elem1);
        expect(list.last).eq(elem1);
        let elem2 = new Listable(2);
        list.pushBack(elem2);
        expect(list.last).eq(elem2);
    });

    it('should return the first element', () => {
        let list = new List<Listable<number>>();
        expect(list.last).eq(undefined);
        let elem1 = new Listable(1);
        list.pushBack(elem1);
        expect(list.first).eq(elem1);
        let elem2 = new Listable(2);
        list.pushFront(elem2);
        expect(list.first).eq(elem2);
    });

    it('should return the nth element', () => {
        let list = new List<Listable<number>>();
        let elem1 = new Listable(1);
        let elem2 = new Listable(2);
        let elem3 = new Listable(3);
        expect(list.get(1)).eq(undefined);
        list.pushBack(elem1);
        list.pushBack(elem2);
        list.pushBack(elem3);
        expect(list.get(2)).eq(elem3);
        expect(list.get(0)).eq(elem1);
    });

    it('should have next and previous properties', () => {
        let values = [new Listable(1), new Listable(2), new Listable(3)];
        let list = new List<Listable<number>>(...values);
        expect(list.get(0).previous).eq(undefined);
        expect(list.get(0).next).eq(list.get(1));
        expect(list.get(1).previous).eq(list.get(0));
        expect(list.get(1).next).eq(list.get(2));
        expect(list.get(2).previous).eq(list.get(1));
        expect(list.get(2).next).eq(undefined);
    });

    it('should return if has next or previous elements', () => {
        let values = [new Listable(1), new Listable(2), new Listable(3)];
        let list = new List<Listable<number>>(...values);
        expect(list.get(0).hasPrevious).eq(false);
        expect(list.get(0).hasNext).eq(true);
        expect(list.get(1).hasPrevious).eq(true);
        expect(list.get(1).hasNext).eq(true);
        expect(list.get(2).hasPrevious).eq(true);
        expect(list.get(2).hasNext).eq(false);
    });

    it('should iterate over the elements', () => {
        let values = [new Listable(1), new Listable(2), new Listable(3)];
        let list = new List<Listable<number>>(...values);
        let elem = list.first;
        let value = 1;
        while (elem.hasNext) {
            expect(elem.value).eq(value);
            elem = elem.next;
            value++;
        }
    });

});