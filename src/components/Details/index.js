import styled from 'styled-components'

const Details = styled.details`
    display: inline;

    &[open] {
      position: absolute;
      background: white;
      width: 300px;
      padding: 20px;
      box-shadow: -10px 10px 0 #B07EC5;
      border: 6px solid #252525;
      line-height: 17px;
      z-index: 1;
      margin-left: -90px;
    }

    &[open] summary {
      position: relative;
    }
    
    &[open] summary .amount {
      display:none;
    }

    &[open] summary .close {
      display:inline-block;
      position: absolute;
      right: -10px;
      top: -14px;
      font-size: 11px;
    }

    summary .close {
      display:none;
    }

    li {
      display: flex;
      flex-direction: column;
      margin: 10px 0;
    }
    strong {
      display: flex;
    }

    summary:focus {
      outline: none;
    }
    summary::-webkit-details-marker {
      display: none
    }
    small {
      display: block;
      font-size: 8px;
      line-height: 14px;
    }

    .author-link {
      text-decoration: none;
      color: black;
    }
    .remove-comment {
      cursor: pointer;
    }
`

export default Details
