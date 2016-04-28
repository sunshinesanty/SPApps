using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sample.AuthSPWeb.Models
{
    public class ListDataModel
    {
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public String Title { get; set; }
        public String CreatedBy { get; set; }
        public String ModifiedBy { get; set; }
        public String ContentType { get; set; }
    }

    public class ListDataCollection : ICollection<ListDataModel>
    {
        private List<ListDataModel> _list = null;
        public ListDataCollection() { _list = new List<ListDataModel>(); }
        public int Count
        {
            get
            {
                return _list.Count;
            }
        }

        public bool IsReadOnly
        {
            get
            {
                return false;
            }
        }

        public void Add(ListDataModel item)
        {
            _list.Add(item);
        }

        public void Clear()
        {
            _list.Clear();
        }

        public bool Contains(ListDataModel item)
        {
            return _list.Contains(item);

        }

        public void CopyTo(ListDataModel[] array, int arrayIndex)
        {
            _list.CopyTo(array, arrayIndex);
        }

        public IEnumerator<ListDataModel> GetEnumerator()
        {
            return _list.GetEnumerator();
        }

        public bool Remove(ListDataModel item)
        {
            return _list.Remove(item);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _list.GetEnumerator();
        }
    }
}